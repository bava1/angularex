export class Task {
    constructor(
        public name: string,
        public id?: number,
    ) {}
}

export interface Tasks {
    tasks: Task[]
}
