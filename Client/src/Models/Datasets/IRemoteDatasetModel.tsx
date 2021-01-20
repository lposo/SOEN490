export interface IPublicationModel {
  publication_name: string,
  publication_doi: string,
  publication_pages: number,
  publication_volume: number,
  publication_year: number,
  publication_datePublished: Date,
  publication_dateAccessed: Date,
  dataset_id: number,
  publisher_name: string,
  publicationtype_name: string
}

export interface IAuthorModel {
  author_firstName: string,
  author_lastName: string,
  author_middleName: string,
  dataset_id: number
}

export interface IDatasetModel {
  dataset_id: number,
  dataset_name: string,
  dataset_comments: string,
  datasetdatatype_name: string,
  category_name: string,
  subcategory_name: string
}

export interface IMaterialModel {
  material_details: string,
  composition_name: string,
  dataset_id: number
}

export interface IDataPointModel {
  datapoints_name: string,
  datapoints_values: number[],
  units_units: string,
  representations_repr: string,
  dataset_id: number
}

export interface IDataPointCommentModel {
  datapointcomments_comments: string[],
  dataset_id: number
}

export interface IDatasetResponseModel {
  publications: IPublicationModel[],
  authors: IAuthorModel[],
  dataset: IDatasetModel[],
  materials: IMaterialModel[],
  dataPoints: IDataPointModel[],
  dataPointComments: IDataPointCommentModel[]
}

export const toLocalDatasetModel = (response: IDatasetResponseModel): IDatasetModel => {
  if (!response) {
    return null
  }
  const localDataset: IDatasetModel = {

  }

  return localDataset
}