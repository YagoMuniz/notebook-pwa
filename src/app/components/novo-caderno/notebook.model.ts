export class Notebook {
    title: string;
    description: string;
    name: string;
    pages: Array<string>;
    number_of_pages: number;

    user ?: string;
    id ?: string;
    createdAt?:string;
}