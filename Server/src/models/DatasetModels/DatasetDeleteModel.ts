import { Connection, getConnection } from "typeorm";
import { Authors } from "../entities/Authors";
import { Composition } from "../entities/Composition";
import { Datapoints } from "../entities/Datapoints";
import { Dataset } from "../entities/Dataset";
import { Datasetdatatype } from "../entities/Datasetdatatype";
import { Material } from "../entities/Material";
import { Publications } from "../entities/Publications";
import { Publicationtype } from "../entities/Publicationtype";
import { Publisher } from "../entities/Publisher";
import { Representations } from "../entities/Representations";
import { Units } from "../entities/Units";
import { DatasetCommonModel } from "./DatasetCommonModel";


/**
 * This model class is responsible for all methods pertaining to removing a data set entry from the database.
 * A number of these methods are also referenced during the updating of a data set entry. 
 */
export class DatasetDeleteModel {
    private connection: Connection;
    private commonModel: DatasetCommonModel
    constructor() {
        this.connection = getConnection();
        this.commonModel = new DatasetCommonModel();
    }

    private selectDataPointFKViaDatasetIdQuery = (id: number) =>
        this.connection.createQueryBuilder(Datapoints, 'datapoints')
            .select('datapoints.unitsId', 'unitsId')
            .addSelect('datapoints.representationsId', 'representationsId')
            .where('datapoints.datasetId = :id', { id: id })
            .getRawMany();

    private selectOneUseOfUnitQuery = (id: number) =>
        this.connection.createQueryBuilder(Datapoints, 'datapoints')
            .where("datapoints.unitsId = :id", { id: id })
            .getOne();

    private selectOneUseOfRepresentationQuery = (id: number) =>
        this.connection.createQueryBuilder(Datapoints, 'datapoints')
            .where("datapoints.representationsId = :id", { id: id })
            .getOne();

    private selectAllLinkedCompositionIdsQuery = (idArray: number[]) =>
        this.connection.createQueryBuilder(Material, 'material')
            .select('material.compositionId', 'id')
            .whereInIds(idArray)
            .getRawMany();

    private selectOneUseOfCompositionQuery = (id: number) =>
        this.connection.createQueryBuilder(Material, 'material')
            .where("material.compositionId = :id", { id: id })
            .getOne();

    private selectOneUseOfPublicationQuery = (id: number) =>
        this.connection.createQueryBuilder(Dataset, 'dataset')
            .where("dataset.publicationId = :id", { id: id })
            .getOne();

    private selectOneUseOfPublisherQuery = (id: number) =>
        this.connection.createQueryBuilder(Publications, 'publication')
            .where("publication.publisherId = :id", { id: id })
            .getOne();

    private selectOneUseOfPublicationTypeQuery = (id: number) =>
        this.connection.createQueryBuilder(Publications, 'publication')
            .where("publication.publicationtypeId = :id", { id: id })
            .getOne();

    private selectOneUseOfDatasetDataTypeQuery = (id: number) =>
        this.connection.createQueryBuilder(Dataset, 'dataset')
            .where("dataset.datatypeId = :id", { id: id })
            .getOne();

    private deletUnitsQuery = (idArray: number[]) =>
        this.connection.createQueryBuilder()
            .delete()
            .from(Units)
            .whereInIds(idArray)
            .execute();

    private deletRepresentationsQuery = (idArray: number[]) =>
        this.connection.createQueryBuilder()
            .delete()
            .from(Representations)
            .whereInIds(idArray)
            .execute();

    private deleteDatapointsQuery = (id: number) =>
        this.connection.createQueryBuilder()
            .delete()
            .from(Datapoints)
            .where("datasetId = :id", { id: id })
            .execute();

    private deleteMaterialsQuery = (idArray: number[]) =>
        this.connection.createQueryBuilder()
            .delete()
            .from(Material)
            .whereInIds(idArray)
            .execute();

    private deleteCompositionsQuery = (idArray: number[]) =>
        this.connection.createQueryBuilder()
            .delete()
            .from(Composition)
            .whereInIds(idArray)
            .execute();

    private deleteAuthorsQuery = (idArray: number[]) =>
        this.connection.createQueryBuilder()
            .delete()
            .from(Authors)
            .whereInIds(idArray)
            .execute();

    private deletePublicationQuery = (id: number) =>
        this.connection.createQueryBuilder()
            .delete()
            .from(Publications)
            .where("id = :id", { id: id })
            .execute();

    private deletePublisherQuery = (id: number) =>
        this.connection.createQueryBuilder()
            .delete()
            .from(Publisher)
            .where("id = :id", { id: id })
            .execute();

    private deletePublicationTypeQuery = (id: number) =>
        this.connection.createQueryBuilder()
            .delete()
            .from(Publicationtype)
            .where("id = :id", { id: id })
            .execute();

    private deleteDatasetQuery = (id: number) =>
        this.connection.createQueryBuilder()
            .delete()
            .from(Dataset)
            .where("id = :id", { id: id })
            .execute();

    private deleteDatasetDataTypeQuery = (id: number) =>
        this.connection.createQueryBuilder()
            .delete()
            .from(Datasetdatatype)
            .where("id = :id", { id: id })
            .execute();

    private async deleteUnitsRepresentationsOfDataPoints(rawDataPointFK: any) {
        let isVariableInUse: any
        let unitsToDelete: number[] = []
        let reprToDelete: number[] = []
        for (let index = 0; index < rawDataPointFK.length; index++) {
            isVariableInUse = await this.selectOneUseOfUnitQuery(rawDataPointFK[index].unitsId)
            if (isVariableInUse == undefined) {
                unitsToDelete.push(rawDataPointFK[index].unitsId)
            }
            isVariableInUse = await this.selectOneUseOfRepresentationQuery(rawDataPointFK[index].representationsId)
            if (isVariableInUse == undefined) {
                reprToDelete.push(rawDataPointFK[index].representationsId)
            }
        }
        if (unitsToDelete.length > 0) {
            await this.deletUnitsQuery(unitsToDelete)
        }
        if (reprToDelete.length > 0) {
            await this.deletRepresentationsQuery(reprToDelete)
        }
    }

    async deleteDataPointsOfDataset(datasetId: number) {
        let rawDataPointFK = await this.selectDataPointFKViaDatasetIdQuery(datasetId)
        await this.deleteDatapointsQuery(datasetId)
        await this.deleteUnitsRepresentationsOfDataPoints(rawDataPointFK)
    }

    async deleteMaterialsOfDataset(datasetId: number) {
        let isMaterialInUse: any
        let materialsToDelete: number[] = []
        let rawCompositionIds: any
        let rawMaterialIds = await this.connection.query("SELECT materialId FROM dataset_materials_material WHERE datasetId = ?", [datasetId])
        await this.connection.query("DELETE FROM dataset_materials_material WHERE datasetId = ?", [datasetId])
        // Check which materials are still in use
        for (let index = 0; index < rawMaterialIds.length; index++) {
            isMaterialInUse = await this.connection.query("SELECT datasetId FROM dataset_materials_material WHERE materialId = ?", [rawMaterialIds[index].materialId]);
            if (isMaterialInUse.length < 1) {
                materialsToDelete.push(rawMaterialIds[index].materialId)
            }
        }
        if (materialsToDelete.length > 0) {
            rawCompositionIds = await this.selectAllLinkedCompositionIdsQuery(materialsToDelete)
            await this.deleteMaterialsQuery(materialsToDelete)
            await this.deleteCompositions(rawCompositionIds)
        }
    }

    private async deleteCompositions(rawCompositionIds: any[]) {
        let isCompositionInUse: any
        let compositionsToDelete: number[] = []
        for (let index = 0; index < rawCompositionIds.length; index++) {
            isCompositionInUse = await this.selectOneUseOfCompositionQuery(rawCompositionIds[index].id)
            if (isCompositionInUse == undefined) {
                compositionsToDelete.push(rawCompositionIds[index].id)
            }
        }
        if (compositionsToDelete.length > 0) {
            await this.deleteCompositionsQuery(compositionsToDelete)
        }
    }

    async deleteDatasetDataType(datasetDataTypeId: number) {
        let isDatasetDataTypeInUse = await this.selectOneUseOfDatasetDataTypeQuery(datasetDataTypeId)
        if (isDatasetDataTypeInUse == undefined) {
            await this.deleteDatasetDataTypeQuery(datasetDataTypeId)
        }
    }

    async deleteAuthorsOfPublication(publicationsId: number) {
        let isAuthorInUse: any
        let authorsToDelete: number[] = []
        let rawAuthorIds = await this.connection.query("SELECT authorsId FROM publications_authors_authors WHERE publicationsId = ?", [publicationsId])
        await this.connection.query("DELETE FROM publications_authors_authors WHERE publicationsId = ?", [publicationsId])
        // Check which authors are still in use
        for (let index = 0; index < rawAuthorIds.length; index++) {
            isAuthorInUse = await this.connection.query("SELECT publicationsId FROM publications_authors_authors WHERE authorsId = ?", [rawAuthorIds[index].authorsId]);
            if (isAuthorInUse.length < 1) {
                authorsToDelete.push(rawAuthorIds[index].authorsId)
            }
        }
        if (authorsToDelete.length > 0)
            await this.deleteAuthorsQuery(authorsToDelete)
    }

    async deletePublication(publicationId: number) {
        let isPublicationInUse = await this.selectOneUseOfPublicationQuery(publicationId)
        if (isPublicationInUse == undefined) {
            await this.deletePublicationQuery(publicationId)
        }
    }
    async deletePublisher(publisherId: number) {
        let isPublisherInUse = await this.selectOneUseOfPublisherQuery(publisherId)
        if (isPublisherInUse == undefined) {
            await this.deletePublisherQuery(publisherId)
        }
    }

    async deletePublicationType(publicationTypeId: number) {
        let isPublicationTypeInUse = await this.selectOneUseOfPublicationTypeQuery(publicationTypeId)
        if (isPublicationTypeInUse == undefined) {
            await this.deletePublicationTypeQuery(publicationTypeId)
        }
    }

    async rejectDataset(id: number): Promise<string> {
        let rawDatasetFKs = await this.commonModel.selectDatasetFKQuery(id);
        // First clear tables that need dataset ID
        await this.commonModel.deleteDatapointCommentsQuery(id)
        await this.deleteDataPointsOfDataset(id)
        await this.deleteMaterialsOfDataset(id)
        // Delete dataset proper
        await this.commonModel.wipeEntryFromUnapprovedTable(id)
        await this.deleteDatasetQuery(id)
        await this.deleteDatasetDataType(rawDatasetFKs.datatypeId)
        // Delete publication and its data
        await this.deleteAuthorsOfPublication(rawDatasetFKs.publicationId)
        await this.deletePublication(rawDatasetFKs.publicationId)
        await this.deletePublisher(rawDatasetFKs.publisherId)
        await this.deletePublicationType(rawDatasetFKs.publicationTypeId)
        return "Successfully removed data set"
    }
}
