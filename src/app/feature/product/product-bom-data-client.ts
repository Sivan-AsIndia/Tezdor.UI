import { Injectable, signal } from '@angular/core';
import { BomNode } from './product-bom';
import { INITIAL_BOM_NODES, INITIAL_BOM_NEXT_ID } from './product-bom.seed';

@Injectable({
  providedIn: 'root',
})
export class BomDataClient {

    private _nodes = signal<BomNode[]>([...INITIAL_BOM_NODES]);
  private _nextId = INITIAL_BOM_NEXT_ID;
   readonly allNodes = this._nodes.asReadonly();
 
  getByProductId(productId: number): BomNode[] {
    return this._nodes().filter(n => n.productId === productId);
  }
 
  rolledUpCost(productId: number): number {
    const nodes = this.getByProductId(productId);
    const parentIds = new Set(
      nodes.filter(n => n.parentId !== null).map(n => n.parentId!)
    );
    const leaves = nodes.filter(n => !parentIds.has(n.id));
    return leaves.reduce((sum, n) => {
      return (
        sum +
        (+(n.quantity ?? 0)) *
          (+(n.costPerUnit ?? 0)) *
          (1 + (+(n.wastagePercent ?? 0)) / 100)
      );
    }, 0);
  }
 
  bomDepth(productId: number): number {
    const nodes = this.getByProductId(productId);
    return nodes.length ? Math.max(...nodes.map(n => n.level)) : 0;
  }
 
  saveBomForProduct(productId: number, nodes: BomNode[]): void {
    const others = this._nodes().filter(n => n.productId !== productId);
    const stamped = nodes.map(n => ({ ...n, productId }));
    this._nodes.set([...others, ...stamped]);
  }
 
  addNode(node: Omit<BomNode, 'id'>): BomNode {
    const newNode: BomNode = { ...node, id: this._nextId++ } as BomNode;
    this._nodes.update(arr => [...arr, newNode]);
    return newNode;
  }
 
  updateNode(id: number, changes: Partial<BomNode>): void {
    this._nodes.update(arr =>
      arr.map(n => (n.id === id ? { ...n, ...changes } : n))
    );
  }
 
  deleteNode(id: number): void {
    const toDelete = new Set<number>();
    const collect = (nid: number) => {
      toDelete.add(nid);
      this._nodes()
        .filter(n => n.parentId === nid)
        .forEach(c => collect(c.id));
    };
    collect(id);
    this._nodes.update(arr => arr.filter(n => !toDelete.has(n.id)));
  }
 
  getNextId(): number {
    return this._nextId++;
  }
}
