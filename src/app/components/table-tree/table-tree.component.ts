import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { Dob, Location, Login, Name, UserRoot } from '../../models/user-model';
import { UserService } from '../../services/user.service';
import { FlatTreeControl } from '@angular/cdk/tree';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
  MatTreeModule,
} from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

interface UserNode {
  name: string;
  value?: string;
  children?: UserNode[];
}

interface FlatNode {
  expandable: boolean;
  name: string;
  level: number;
  value: string;
}

@Component({
  selector: 'app-table-tree',
  standalone: true,
  imports: [MatTreeModule, MatButtonModule, MatIconModule],
  templateUrl: './table-tree.component.html',
  styleUrl: './table-tree.component.scss',
})
export class TableTreeComponent {
  private _transformer = (node: UserNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
      value: node.value || '',
    };
  };

  treeControl = new FlatTreeControl<FlatNode>(
    (node) => node.level,
    (node) => node.expandable
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    (node) => node.level,
    (node) => node.expandable,
    (node) => node.children
  );
  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  users = [] as UserRoot[];
  @ViewChild(MatTable) table!: MatTable<UserRoot>;

  constructor(private userService: UserService) {
    this.formatUserTree(this.userService.getUsers());
    this.table = {} as MatTable<UserRoot>;
  }

  formatUserTree(users: UserRoot[]): void {
    const formattedData: UserNode[] = users.map((user) => ({
      name: user.name.first + ' ' + user.name.last,
      children: [
        { name: 'Gender', value: user.gender },
        { name: 'Email', value: user.email },
        { name: 'Phone', value: user.phone },
        { name: 'Cell', value: user.cell },
        { name: 'Nationality', value: user.nat },
        this.formatName(user.name),
        this.formatLocation(user.location),
        this.formatLoginDetails(user.login),
        this.formatDOB(user.dob),
      ].filter((node) => node.value !== undefined || node.children),
    }));
    this.dataSource.data = formattedData;
  }

  private formatName(name: Name): UserNode {
    return {
      name: 'Name',
      children: [
        { name: 'Title', value: name.title },
        { name: 'First', value: name.first },
        { name: 'Last', value: name.last },
      ],
    };
  }

  private formatLocation(location: Location): UserNode {
    return {
      name: 'Location',
      children: [
        {
          name: 'Street',
          value: `${location.street.number} ${location.street.name}`,
        },
        { name: 'City', value: location.city },
        { name: 'State', value: location.state },
        { name: 'Country', value: location.country },
        { name: 'Postcode', value: location.postcode },
        {
          name: 'Coordinates',
          value: `Lat: ${location.coordinates.latitude}, Lon: ${location.coordinates.longitude}`,
        },
        {
          name: 'Timezone',
          value: `${location.timezone.offset}, ${location.timezone.description}`,
        },
      ],
    };
  }

  private formatLoginDetails(login: Login): UserNode {
    return {
      name: 'Login Details',
      children: [
        { name: 'Username', value: login.username },
        // Omit sensitive data like passwords from the UI
      ],
    };
  }

  private formatDOB(dob: Dob): UserNode {
    return {
      name: 'DOB',
      children: [
        { name: 'Date', value: dob.date },
        { name: 'Age', value: dob.age.toString() },
      ],
    };
  }

  hasChild = (_: number, node: FlatNode) => node.expandable;
}
