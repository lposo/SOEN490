import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn} from "typeorm";


/**
 * The entity annotation indicates that a table is being created
 */
@Entity()
export class Datasetdatatype {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: String

    @CreateDateColumn()  
    created: Date

    @UpdateDateColumn()
    updated: Date
}