import {Entity, Column, PrimaryGeneratedColumn, getRepository, FindManyOptions} from "typeorm";

@Entity()
export default class DataPoint {
    @PrimaryGeneratedColumn()
    datapoint_id: number
    @Column()
    dataset_id: number
    @Column()
    initial_density: number
    @Column()
	initial_temperature: number
    @Column()
	initial_pressure: number
    @Column()
	shock_velocity: number
    @Column()
	particle_velocity: number
    @Column()
	density: number
    @Column()
	temperature: number
    @Column()
	pressure: number
    @Column()
	specific_volume: number
    @Column()
	compression_ratio: number
    @Column()
	comments: string

    public static getDataPoints = (id: number): Promise<DataPoint[]> => {
        return getRepository(DataPoint).find({ dataset_id: id });
    }

    public static createDataPoints = (dataPoints: DataPoint[]): DataPoint[] => {
        return getRepository(DataPoint).create(dataPoints);
    }
}