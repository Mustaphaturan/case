export interface DataModel {
    id: string;
    kontrat: string;
    teklif: string;
    data: string;
    edit?: boolean;

}
export interface EditDataModel extends DataModel {
    uid: string;
}