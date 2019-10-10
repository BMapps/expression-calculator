const Node = require('./node');

class LinkedList {    
    constructor() {
        this._head=null;
        this._tail=null; 
        this.length=0;
    }
    append(data) {
        if (this.length==0){
            this._head=this._tail=new Node(data);
        } else {
            let newNode=new Node(data,this._tail);
            this._tail.next=newNode;
            this._tail=newNode;
        }
        this.length++;     
        return this;
    }

    head() {
        return this._head?this._head.data:null;
    }

    tail() {
        return this._tail?this._tail.data:null;
    }

    at(index) {
        if (this.length==0) return null;
        if (index==this.length) return this.tail();        
        if (index==0) return this.head();
        let pos=this._head;
        for (let i=0;i<index;i++){
            pos=pos.next;
        }
        return pos.data;
    }

    insertAt(index, data) {
        if (this.length<1||index>=this.length) {
            this.append(data)        
        } else if (index==0){
            let newNode=new Node(data,null,this._head);
            this._head=newNode;
            this.length++;
        } else {            
            let pos=this._head;
            for (let i=0;i<index-1;i++){
                pos=pos.next;
            }
            let newNode=new Node(data, pos, pos.next);
            pos.next=newNode;
            newNode.next.prev=newNode;
            this.length++;
        }
        return this;
        
    }

    isEmpty() {return (this.length==0)}

    clear() {
        this.length=0;
        this._head=null;
        this._tail=null; 
        return this;
    }

    deleteAt(index) {
        if (this.length<1||this.length<index) return;
        if (index==0&&this.length==1){
            this._head=null;
            this._tail==null;           
        }else if (index==this.length-1) {
            this._tail=this._tail.prev;
            this._tail.next=null;            
        } else{
            let pos=this._head;
            for (let i=0;i<index-2;i++){
                pos=pos.next;
            }
            pos.next=pos.next.next;
            pos.next.prev=pos;
        }
        this.length--;         
        return this;
    }

    reverse() {
        if (this.length<2) return this;
        let start=this._head;
        let end=this._tail;
        for (let i=0;i<this.length/2;i++){
            let temp=start.data;
            start.data=end.data;
            end.data=temp;
            start=start.next;
            end=end.prev;
        }         
        return this;
    }

    indexOf(data) {
        if (this.length==0) return -1;
        let pos=this._head;
        for (let i=0;i<this.length;i++){
            if (pos.data==data) return i;
            pos=pos.next;
        }
        return -1;
    }
    print(){
        let pos=this._head;
        for (let i=0;i<this.length;i++){
            console.log(pos.data);
            pos=pos.next;
        }
    }
   
}
module.exports = LinkedList;
