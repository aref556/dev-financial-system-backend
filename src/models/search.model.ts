import { InDocumentSearch } from "src/interfaces/app.interface";

export class SearchModel implements InDocumentSearch {
    searchText?: string;
    searchType?: string;
    startPage: number;
    limitPage: number;
    
}