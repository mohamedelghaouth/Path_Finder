export class LinkedList{
    constructor(){
        this.head = null
        this.tail = null
        this.size = 0
    }

    pushToTheBack(node){
        let elm = new LinkedListElement(null, this.tail, node)
        if(this.tail !== null){

            this.tail.next = elm
        }
        this.tail= elm
        if(this.head === null){

            this.head = elm
        }
        this.size += 1
    }
    pullFromFront(){

        if(this.head === null){

            return null
        }
        let result = this.head
        if (this.head.next !== null) {
            
            this.head.next.prev = null
        }

        this.head = this.head.next
        this.size -= 1
        result.next = null
        return result.value
    }
}

class LinkedListElement{
    constructor(next, prev, value){
        this.next = next
        this.prev = prev
        this.value = value
    }
}