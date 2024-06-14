export class Vehicle{
    public id:number;
    public model: string;
    public perDay: number;
    public imagePath: string;
    public available: boolean;

    constructor(id:number,model:string,perDay:number,imagePath:string,available:boolean){
        this.id=id;
        this.model = model;
        this.perDay = perDay;
        this.imagePath = imagePath;
        this.available=available;
    }
}