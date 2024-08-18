export class Question{
    text : string;
    answers : [];
    constructor(text : string, answers){
        this.text = text;
        this.answers = answers;
    }
}