export declare class ShowService {
    getShows(date: any): Promise<import("mongodb").WithId<import("bson").Document>[]>;
    import(): void;
    private getMongoClient;
}
