import { TERRAIN_WIDTH, TERRAIN_LENGTH } from "../World/WorldConstants"

export class NoiseParameters
{
    constructor()
    {
        this.octaves = null;
        this.amplitude = null;
        this.smoothness = null;
        this.roughness = null;
        this.heightOffset = null;
    }
}

export class NoiseGenerator
{
    constructor()
    {
        // this.__seed = seed;

        // this.__parameters = new NoiseParameters();
        // this.__parameters.octaves = 2;
        // this.__parameters.amplitude = 3;
        // this.__parameters.smoothness = 25;
        // this.__parameters.roughness = 0.5;
        // this.__parameters.heightOffset = 0;
    }

    // parameters is an optional argument
    reset(seed, parameters)
    {
        this.__seed = seed;

        if(parameters === undefined)
        {
            this.__parameters = new NoiseParameters();
            this.__parameters.octaves = 2;
            this.__parameters.amplitude = 3;
            this.__parameters.smoothness = 25;
            this.__parameters.roughness = 0.5;
            this.__parameters.heightOffset = 0;
        }
        else 
        {
            this.__parameters = parameters;
        }
    }

    setParameters(parameters)
    {
        this.__parameters = parameters;
    }

    getLevel(x, z, terrainX, terrainZ)
    {
        if(this.getHeight(x, z, terrainX, terrainZ) <= 0)
        {
            return 0;
        }

        return 2 * Math.ceil( this.getHeight(x, z, terrainX, terrainZ) ); 
    }

    getHeight(x, z, terrainX, terrainZ)
    {
        if(terrainX === undefined && terrainZ === undefined)
        {
            terrainX = 0;
            terrainZ = 0;
        }

        let gX = x + terrainX * TERRAIN_WIDTH;
        let gZ = z + terrainZ * TERRAIN_LENGTH;

        let height = 0.0;

        for(let i = 0; i < this.__parameters.octaves; i++)
        {
            let frequency = Math.pow(2.0, i);
            let amplitude = Math.pow(this.__parameters.roughness, i);

            height += this.__getInterpolatedNoise(
                gX * frequency / this.__parameters.smoothness,
                gZ * frequency / this.__parameters.smoothness
                ) * amplitude;
        }

        height = height * this.__parameters.amplitude + this.__parameters.heightOffset;

        return height;
    }

    // This function works as a pseudo random number generator
    __getNoise(x, z)
    {
        let n = (1619 * x + 31337 * z + 1013 * this.__seed) & 0x7fffffff;
        n = BigInt((n >> 13) ^ n);
        n = n * (n * n * 60493n + 19990303n) + 1376312589n;
        n = parseInt(n.toString(2).slice(-31), 2);
        return 1 - n / 1073741824;
    }

    __getInterpolatedNoise(x, z)
    {
        let floorX = Math.floor(x);
        let floorZ = Math.floor(z);

        let s = this.__getNoise(floorX, floorZ);
        let t = this.__getNoise(floorX + 1, floorZ);
        let u = this.__getNoise(floorX, floorZ + 1);
        let v = this.__getNoise(floorX + 1, floorZ + 1);

        let res1 = this.__cosineInterpolate(s, t, x - floorX);
        let res2 = this.__cosineInterpolate(u, v, x - floorX);
        let res3 = this.__cosineInterpolate(res1, res2, z - floorZ);

        return res3;
    }

    // Cosine interpolation
    __cosineInterpolate(y1, y2, mu)
    {
        let mu2 = (1.0 - Math.cos(mu * Math.PI)) / 2.0;
        return y1*(1 - mu2) + y2*mu2;
    }
}

export default new NoiseGenerator()