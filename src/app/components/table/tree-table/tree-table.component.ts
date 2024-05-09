import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, signal } from '@angular/core';
import {
  MatTreeFlattener,
  MatTreeFlatDataSource,
  MatTreeModule,
} from '@angular/material/tree';
import { MatTableModule } from '@angular/material/table';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tree-table',
  standalone: true,
  imports: [
    MatTreeModule,
    MatTableModule,
    MatIcon,
    MatButtonModule,
    CommonModule,
  ],
  templateUrl: './tree-table.component.html',
  styleUrl: './tree-table.component.scss',
})
export class TreeTableComponent {
  data: any = STOCK_TRADE;
  displayedColumns: string[] = [
    'expand',
    'trade_id',
    'stock_symbol',
    'trade_date',
    'trade_type',
    'quantity',
    'price',
    'total_cost',
    'brokerage_fee',
    'net_profit',
  ];

  areNodesExpanded = signal<boolean>(false);

  private transformer = (node: any, level: number): DynamicNode => {
    const hasTrades = Array.isArray(node.trades) && node.trades.length > 0;
    const transformedNode: DynamicNode = {
      expandable: hasTrades,
      level: level,
      ...node,
    };

    return transformedNode;
  };

  treeControl = new FlatTreeControl<DynamicNode>(
    (node) => node.level,
    (node) => node.expandable
  );

  treeFlattener = new MatTreeFlattener(
    this.transformer,
    (node) => node.level,
    (node) => node.expandable,
    (node) => node.trades || []
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor() {
    this.dataSource.data = this.data;
  }

  hasChild = (_: number, node: DynamicNode) => node.expandable;

  getChildren(node: any): any[] {
    return node.children || [];
  }

  toggleExpandCollapse() {
    if (this.areNodesExpanded()) {
      this.treeControl.dataNodes.forEach((node) => {
        if (node.expandable) {
          this.treeControl.collapse(node);
        }
      });
    } else {
      this.treeControl.dataNodes.forEach((node) => {
        if (node.expandable) {
          this.treeControl.expand(node);
        }
      });
    }
    this.areNodesExpanded.update(() => !this.areNodesExpanded());
  }

  isParentExpanded(node: DynamicNode): boolean {
    return this.treeControl.isExpanded(node);
  }

  getParentNode(node: DynamicNode): DynamicNode | null {
    const currentLevel = node.level;
    const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;

    for (let i = startIndex; i >= 0; i--) {
      const currentNode = this.treeControl.dataNodes[i];

      if (currentNode.level < currentLevel) {
        return currentNode;
      }
    }

    return null;
  }

  isAnyParentExpanded(node: DynamicNode): boolean {
    let parent = this.getParentNode(node);
    while (parent) {
      if (this.isParentExpanded(parent)) {
        return true;
      }
      parent = this.getParentNode(parent);
    }
    return false;
  }

  isChildNode(node: DynamicNode): boolean {
    return node.level > 0;
  }
}

interface DynamicNode {
  expandable: boolean;
  level: number;
  [key: string]: any; // Allow for any other properties dynamically.
}

export interface stockTrades {
  trade_id: number;
  stock_symbol: string;
  trade_date: string;
  trade_type: string;
  quantity: number;
  price: number;
  total_cost: number;
  brokerage_fee: number;
  net_profit: number;
  trades: stockTrades[];
}

const STOCK_TRADE: stockTrades[] = [
  {
    trade_id: 1,
    stock_symbol: 'HZO',
    trade_date: '11/12/2020',
    trade_type: 'sell',
    quantity: 9532,
    price: 409.84,
    total_cost: 3906594.88,
    brokerage_fee: 93.19,
    net_profit: 3906501.69,
    trades: [
      {
        trade_id: 3,
        stock_symbol: 'ARR^A',
        trade_date: '10/6/2020',
        trade_type: 'sell',
        quantity: 6944,
        price: 284.17,
        total_cost: 1973276.48,
        brokerage_fee: 77.7,
        net_profit: 1973198.78,
        trades: [
          {
            trade_id: 4,
            stock_symbol: 'POLA',
            trade_date: '5/24/2020',
            trade_type: 'sell',
            quantity: 5819,
            price: 420.67,
            total_cost: 2447878.73,
            brokerage_fee: 93.19,
            net_profit: 2447785.54,
            trades: [],
          },
          {
            trade_id: 5,
            stock_symbol: 'FARO',
            trade_date: '3/1/2021',
            trade_type: 'sell',
            quantity: 6076,
            price: 549.6,
            total_cost: 3339369.6,
            brokerage_fee: 42.15,
            net_profit: 3339327.45,
            trades: [],
          },
        ],
      },
    ],
  },

  {
    trade_id: 9,
    stock_symbol: 'UHT',
    trade_date: '1/22/2021',
    trade_type: 'sell',
    quantity: 5980,
    price: 212.32,
    total_cost: 1269673.6,
    brokerage_fee: 20.95,
    net_profit: 1269652.65,
    trades: [
      {
        trade_id: 2,
        stock_symbol: 'BHL',
        trade_date: '4/30/2021',
        trade_type: 'buy',
        quantity: 5765,
        price: 137.85,
        total_cost: 794705.25,
        brokerage_fee: 26.38,
        net_profit: 794678.87,
        trades: [],
      },

      {
        trade_id: 6,
        stock_symbol: 'MILN',
        trade_date: '2/22/2020',
        trade_type: 'sell',
        quantity: 7176,
        price: 165.29,
        total_cost: 1186121.04,
        brokerage_fee: 62.12,
        net_profit: 1186058.92,
        trades: [],
      },
      {
        trade_id: 7,
        stock_symbol: 'ZIOP',
        trade_date: '11/21/2021',
        trade_type: 'buy',
        quantity: 5585,
        price: 565.42,
        total_cost: 3157870.7,
        brokerage_fee: 17.28,
        net_profit: 3157853.42,
        trades: [],
      },
      {
        trade_id: 8,
        stock_symbol: 'XELB',
        trade_date: '6/29/2020',
        trade_type: 'sell',
        quantity: 7329,
        price: 877.52,
        total_cost: 6431344.08,
        brokerage_fee: 65.04,
        net_profit: 6431279.04,
        trades: [],
      },
    ],
  },

  {
    trade_id: 14,
    stock_symbol: 'CIM^A',
    trade_date: '10/2/2021',
    trade_type: 'buy',
    quantity: 155,
    price: 382.49,
    total_cost: 59285.95,
    brokerage_fee: 89.02,
    net_profit: 59196.93,
    trades: [
      {
        trade_id: 10,
        stock_symbol: 'TAL',
        trade_date: '2/7/2020',
        trade_type: 'sell',
        quantity: 8950,
        price: 244.5,
        total_cost: 2188275.0,
        brokerage_fee: 38.43,
        net_profit: 2188236.57,
        trades: [],
      },
      {
        trade_id: 11,
        stock_symbol: 'AIN',
        trade_date: '10/18/2020',
        trade_type: 'buy',
        quantity: 1736,
        price: 238.38,
        total_cost: 413827.68,
        brokerage_fee: 16.9,
        net_profit: 413810.78,
        trades: [],
      },
      {
        trade_id: 12,
        stock_symbol: 'LCA',
        trade_date: '1/31/2021',
        trade_type: 'sell',
        quantity: 2966,
        price: 68.9,
        total_cost: 204357.4,
        brokerage_fee: 77.12,
        net_profit: 204280.28,
        trades: [],
      },
      {
        trade_id: 13,
        stock_symbol: 'NWPX',
        trade_date: '5/12/2020',
        trade_type: 'sell',
        quantity: 4991,
        price: 88.36,
        total_cost: 441004.76,
        brokerage_fee: 26.0,
        net_profit: 440978.76,
        trades: [],
      },
    ],
  },
  {
    trade_id: 15,
    stock_symbol: 'IDT',
    trade_date: '12/3/2020',
    trade_type: 'sell',
    quantity: 7437,
    price: 508.92,
    total_cost: 3784838.04,
    brokerage_fee: 43.14,
    net_profit: 3784794.9,
    trades: [
      {
        trade_id: 16,
        stock_symbol: 'GDS',
        trade_date: '1/25/2021',
        trade_type: 'buy',
        quantity: 4076,
        price: 166.15,
        total_cost: 677227.4,
        brokerage_fee: 43.98,
        net_profit: 677183.42,
        trades: [],
      },
    ],
  },

  {
    trade_id: 17,
    stock_symbol: 'QDEL',
    trade_date: '8/2/2021',
    trade_type: 'buy',
    quantity: 7343,
    price: 781.82,
    total_cost: 5740904.26,
    brokerage_fee: 76.59,
    net_profit: 5740827.67,
    trades: [
      {
        trade_id: 18,
        stock_symbol: 'VBLT',
        trade_date: '7/2/2020',
        trade_type: 'sell',
        quantity: 2047,
        price: 838.34,
        total_cost: 1716081.98,
        brokerage_fee: 35.88,
        net_profit: 1716046.1,
        trades: [],
      },
      {
        trade_id: 19,
        stock_symbol: 'UFS',
        trade_date: '9/28/2020',
        trade_type: 'buy',
        quantity: 4750,
        price: 912.21,
        total_cost: 4332997.5,
        brokerage_fee: 65.2,
        net_profit: 4332932.3,
        trades: [],
      },
      {
        trade_id: 20,
        stock_symbol: 'MSCC',
        trade_date: '12/30/2020',
        trade_type: 'sell',
        quantity: 8363,
        price: 753.8,
        total_cost: 6304029.4,
        brokerage_fee: 89.11,
        net_profit: 6303940.29,
        trades: [],
      },
    ],
  },

  {
    trade_id: 21,
    stock_symbol: 'KGJI',
    trade_date: '4/6/2020',
    trade_type: 'buy',
    quantity: 2706,
    price: 69.49,
    total_cost: 188039.94,
    brokerage_fee: 28.46,
    net_profit: 188011.48,
    trades: [
      {
        trade_id: 22,
        stock_symbol: 'CFCOU',
        trade_date: '8/29/2021',
        trade_type: 'buy',
        quantity: 260,
        price: 544.21,
        total_cost: 141494.6,
        brokerage_fee: 78.18,
        net_profit: 141416.42,
        trades: [],
      },
      {
        trade_id: 23,
        stock_symbol: 'NDRAW',
        trade_date: '12/14/2021',
        trade_type: 'buy',
        quantity: 2311,
        price: 681.69,
        total_cost: 1575385.59,
        brokerage_fee: 41.93,
        net_profit: 1575343.66,
        trades: [],
      },
    ],
  },

  {
    trade_id: 24,
    stock_symbol: 'MSCI',
    trade_date: '10/1/2021',
    trade_type: 'sell',
    quantity: 5511,
    price: 144.47,
    total_cost: 796174.17,
    brokerage_fee: 96.38,
    net_profit: 796077.79,
    trades: [
      {
        trade_id: 25,
        stock_symbol: 'SYX',
        trade_date: '10/12/2020',
        trade_type: 'buy',
        quantity: 624,
        price: 848.87,
        total_cost: 529694.88,
        brokerage_fee: 80.63,
        net_profit: 529614.25,
        trades: [],
      },
      {
        trade_id: 26,
        stock_symbol: 'MEI',
        trade_date: '5/3/2020',
        trade_type: 'buy',
        quantity: 1951,
        price: 360.02,
        total_cost: 702399.02,
        brokerage_fee: 47.47,
        net_profit: 702351.55,
        trades: [],
      },
    ],
  },

  {
    trade_id: 35,
    stock_symbol: 'JOF',
    trade_date: '2/5/2021',
    trade_type: 'sell',
    quantity: 5410,
    price: 380.56,
    total_cost: 2058829.6,
    brokerage_fee: 76.96,
    net_profit: 2058752.64,
    trades: [
      {
        trade_id: 27,
        stock_symbol: 'SYRS',
        trade_date: '8/30/2020',
        trade_type: 'buy',
        quantity: 5122,
        price: 66.16,
        total_cost: 338871.52,
        brokerage_fee: 56.15,
        net_profit: 338815.37,
        trades: [],
      },
      {
        trade_id: 28,
        stock_symbol: 'LORL',
        trade_date: '10/12/2020',
        trade_type: 'sell',
        quantity: 9703,
        price: 140.75,
        total_cost: 1365697.25,
        brokerage_fee: 25.34,
        net_profit: 1365671.91,
        trades: [],
      },
      {
        trade_id: 29,
        stock_symbol: 'WRE',
        trade_date: '9/10/2021',
        trade_type: 'buy',
        quantity: 4797,
        price: 713.82,
        total_cost: 3424194.54,
        brokerage_fee: 71.42,
        net_profit: 3424123.12,
        trades: [],
      },
      {
        trade_id: 30,
        stock_symbol: 'RY',
        trade_date: '1/4/2021',
        trade_type: 'sell',
        quantity: 3388,
        price: 185.02,
        total_cost: 626847.76,
        brokerage_fee: 8.67,
        net_profit: 626839.09,
        trades: [],
      },
      {
        trade_id: 31,
        stock_symbol: 'BFZ',
        trade_date: '10/1/2021',
        trade_type: 'buy',
        quantity: 9524,
        price: 208.55,
        total_cost: 1986230.2,
        brokerage_fee: 36.02,
        net_profit: 1986194.18,
        trades: [],
      },
      {
        trade_id: 32,
        stock_symbol: 'SLNO',
        trade_date: '6/30/2020',
        trade_type: 'buy',
        quantity: 5322,
        price: 361.95,
        total_cost: 1926297.9,
        brokerage_fee: 26.33,
        net_profit: 1926271.57,
        trades: [],
      },
      {
        trade_id: 33,
        stock_symbol: 'DGICA',
        trade_date: '11/23/2021',
        trade_type: 'sell',
        quantity: 5426,
        price: 154.98,
        total_cost: 840921.48,
        brokerage_fee: 18.5,
        net_profit: 840902.98,
        trades: [],
      },
      {
        trade_id: 34,
        stock_symbol: 'APC',
        trade_date: '8/3/2021',
        trade_type: 'buy',
        quantity: 4190,
        price: 16.92,
        total_cost: 70894.8,
        brokerage_fee: 5.27,
        net_profit: 70889.53,
        trades: [],
      },
    ],
  },

  {
    trade_id: 43,
    stock_symbol: 'INTG',
    trade_date: '2/9/2021',
    trade_type: 'buy',
    quantity: 1827,
    price: 61.37,
    total_cost: 112122.99,
    brokerage_fee: 12.45,
    net_profit: 112110.54,
    trades: [
      {
        trade_id: 36,
        stock_symbol: 'EAGLW',
        trade_date: '6/7/2020',
        trade_type: 'buy',
        quantity: 3346,
        price: 370.15,
        total_cost: 1238521.9,
        brokerage_fee: 0.56,
        net_profit: 1238521.34,
        trades: [],
      },
      {
        trade_id: 37,
        stock_symbol: 'NTAP',
        trade_date: '5/13/2020',
        trade_type: 'buy',
        quantity: 7225,
        price: 374.24,
        total_cost: 2703884.0,
        brokerage_fee: 75.72,
        net_profit: 2703808.28,
        trades: [],
      },
      {
        trade_id: 38,
        stock_symbol: 'NTEC',
        trade_date: '7/18/2021',
        trade_type: 'sell',
        quantity: 9628,
        price: 526.49,
        total_cost: 5069045.72,
        brokerage_fee: 97.36,
        net_profit: 5068948.36,
        trades: [],
      },
      {
        trade_id: 39,
        stock_symbol: 'LALT',
        trade_date: '11/4/2021',
        trade_type: 'buy',
        quantity: 1387,
        price: 200.45,
        total_cost: 278024.15,
        brokerage_fee: 97.26,
        net_profit: 277926.89,
        trades: [],
      },
      {
        trade_id: 40,
        stock_symbol: 'RAVN',
        trade_date: '10/11/2021',
        trade_type: 'buy',
        quantity: 1589,
        price: 313.57,
        total_cost: 498262.73,
        brokerage_fee: 59.31,
        net_profit: 498203.42,
        trades: [],
      },
      {
        trade_id: 41,
        stock_symbol: 'SANW',
        trade_date: '1/27/2020',
        trade_type: 'buy',
        quantity: 1664,
        price: 134.41,
        total_cost: 223658.24,
        brokerage_fee: 38.64,
        net_profit: 223619.6,
        trades: [],
      },
      {
        trade_id: 42,
        stock_symbol: 'GNTX',
        trade_date: '2/20/2021',
        trade_type: 'sell',
        quantity: 2045,
        price: 357.62,
        total_cost: 731332.9,
        brokerage_fee: 55.05,
        net_profit: 731277.85,
        trades: [],
      },
    ],
  },

  {
    trade_id: 49,
    stock_symbol: 'ACWI',
    trade_date: '10/1/2021',
    trade_type: 'buy',
    quantity: 9619,
    price: 444.12,
    total_cost: 4271990.28,
    brokerage_fee: 94.37,
    net_profit: 4271895.91,
    trades: [
      {
        trade_id: 44,
        stock_symbol: 'SCHW^C',
        trade_date: '8/4/2020',
        trade_type: 'buy',
        quantity: 9279,
        price: 279.56,
        total_cost: 2594037.24,
        brokerage_fee: 90.3,
        net_profit: 2593946.94,
        trades: [],
      },
      {
        trade_id: 45,
        stock_symbol: 'MP^D',
        trade_date: '2/7/2020',
        trade_type: 'buy',
        quantity: 7632,
        price: 968.32,
        total_cost: 7390218.24,
        brokerage_fee: 97.52,
        net_profit: 7390120.72,
        trades: [],
      },
      {
        trade_id: 46,
        stock_symbol: 'JMBA',
        trade_date: '10/17/2021',
        trade_type: 'buy',
        quantity: 9300,
        price: 151.44,
        total_cost: 1408392.0,
        brokerage_fee: 69.37,
        net_profit: 1408322.63,
        trades: [],
      },
      {
        trade_id: 47,
        stock_symbol: 'STAR^F',
        trade_date: '5/23/2021',
        trade_type: 'buy',
        quantity: 3517,
        price: 776.17,
        total_cost: 2729789.89,
        brokerage_fee: 58.83,
        net_profit: 2729731.06,
        trades: [],
      },
      {
        trade_id: 48,
        stock_symbol: 'NTAP',
        trade_date: '2/10/2021',
        trade_type: 'sell',
        quantity: 5485,
        price: 272.86,
        total_cost: 1496637.1,
        brokerage_fee: 81.66,
        net_profit: 1496555.44,
        trades: [],
      },
    ],
  },
  {
    trade_id: 50,
    stock_symbol: 'CIBR',
    trade_date: '1/27/2021',
    trade_type: 'sell',
    quantity: 1106,
    price: 168.2,
    total_cost: 186029.2,
    brokerage_fee: 50.65,
    net_profit: 185978.55,
    trades: [],
  },
];
