import { Authors } from './Authors';
import { Publicationtype } from './Publicationtype';
import { Publisher } from './Publisher';
import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, ManyToMany, JoinTable, ManyToOne, JoinColumn, EntityManager } from "typeorm";
import { Dataset } from './Dataset';


/**
 * The entity annotation indicates that a table is being created
 * This entity handles publications and has foreign key references to:
 * the publisher, publication type, and authors
 */
@Entity()
export class Publications {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column({ nullable: true })
    doi: string

    @Column({ nullable: true, type: "int" })
    pages: number

    @Column({ nullable: true, type: "int" })
    volume: number

    @Column({ default: 1 })
    publicationtypeId: number

    /*
    * This ManyToOne and JoinColumn snippet is declaring that the preceeding Column 
    * is storing a Foreign Key reference to an entry in the Publicationtype table.
    * Specifically, the format is Column xxxId connects to xxx?
    */
    @ManyToOne(type => Publicationtype)
    @JoinColumn()
    publicationtype?: Publicationtype

    @Column({ default: 1 })
    publisherId: number

    /*
    * This ManyToOne and JoinColumn snippet is declaring that the preceeding Column 
    * is storing a Foreign Key reference to an entry in the Publisher table.
    * Specifically, the format is Column xxxId connects to xxx?
    */
    @ManyToOne(type => Publisher)
    @JoinColumn()
    publisher?: Publisher

    @Column({ type: "int", width: 4 })
    year: number

    @Column({ nullable: true })
    datePublished: Date

    @Column({ nullable: true })
    dateAccessed: Date

    @CreateDateColumn()
    created: Date

    @UpdateDateColumn()
    updated: Date

    /*
    * This ManyToMany and JoinTable snippet is used to link the Publications table and the
    * Authors table together. This will generate a new third table that contains
    * Foreign Keys of linked Publications and Authors IDs.
    * The 'author => author.publications' line is added for use in query building
    * for it defines the direction of the "link" with the Authors table
    */
    @ManyToMany(type => Authors, author => author.publications)
    @JoinTable()
    authors: Authors[];
}

export const selectPublicationsQuery = (manager: EntityManager) =>
    manager.createQueryBuilder(Publications, 'publication')
        .select('publication.name', 'publication_name')
        .addSelect('dataset.id', 'dataset_id')
        .addSelect('publication.doi', 'publication_doi')
        .addSelect('publication.pages', 'publication_pages')
        .addSelect('publication.volume', 'publication_volume')
        .addSelect('publication.year', 'publication_year')
        .addSelect('publication.datePublished', 'publication_datePublished')
        .addSelect('publication.dateAccessed', 'publication_dateAccessed')
        .addSelect('publisher.name', 'publisher_name')
        .addSelect('publicationtype.name', 'publicationtype_name')
        .innerJoin(Dataset, 'dataset', 'publication.id = dataset.publicationId')
        .innerJoin(Publisher, 'publisher', 'publication.publisherId = publisher.id')
        .innerJoin(Publicationtype, 'publicationtype', 'publication.publicationtypeId = publicationtype.id')