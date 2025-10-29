import { Component, inject, OnInit, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DatePickerModule } from 'primeng/datepicker';
import { InputTextModule } from 'primeng/inputtext';
import { KeyFilterModule } from 'primeng/keyfilter';
import { MultiSelectModule } from 'primeng/multiselect';
import { PasswordModule } from 'primeng/password';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TableModule } from 'primeng/table';
import { Checkbox } from 'primeng/checkbox';
import { Tag } from 'primeng/tag';
import { InputIcon } from 'primeng/inputicon';
import { IconField } from 'primeng/iconfield';
import { SelectModule } from 'primeng/select';
import { Slider } from 'primeng/slider';
import { ProgressBar } from 'primeng/progressbar';
import { Customer } from './customer';
interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
};

interface City {
  name: string,
  code: string
};

export interface Country {
  name?: string;
  code?: string;
}

export interface Representative {
  name?: string;
  image?: string;
}

export interface Customers {
  id?: number;
  name?: string;
  country?: Country;
  company?: string;
  date?: string | Date;
  status?: string;
  activity?: number;
  representative?: Representative;
  verified?: boolean;
  balance?: number;
}
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ButtonModule, AutoCompleteModule,
    FormsModule, Checkbox, CommonModule, DatePickerModule,
    InputTextModule, KeyFilterModule, MultiSelectModule, PasswordModule,
    RadioButtonModule,
    TableModule, Tag, ButtonModule, IconField, InputIcon
    , SelectModule, Slider, ProgressBar
  ],
  templateUrl: './app.html',
  styles: [
    `
    :host ::ng-deep {
        .p-paginator {
            .p-paginator-current {
                margin-left: auto;
            }
        }

        .p-progressbar {
            height: .5rem;
            background-color: #D8DADC;

            .p-progressbar-value {
                background-color: #607D8B;
            }
        }

        .table-header {
            display: flex;
            justify-content: space-between;
        }

        .p-calendar .p-datepicker {
            min-width: 25rem;

            td {
                font-weight: 400;
            }
        }

        .p-datatable.p-datatable-customers {
            .p-datatable-header {
                padding: 1rem;
                text-align: left;
                font-size: 1.5rem;
            }

            .p-paginator {
                padding: 1rem;
            }

            .p-datatable-thead > tr > th {
                text-align: left;
            }

            .p-datatable-tbody > tr > td {
                cursor: auto;
            }

            .p-select-label:not(.p-placeholder) {
                text-transform: uppercase;
            }
        }

        .p-w-100 {
            width: 100%;
        }

        /* Responsive */
        .p-datatable-customers .p-datatable-tbody > tr > td .p-column-title {
            display: none;
        }
    }

    @media screen and (max-width: 960px) {
        :host ::ng-deep {
            .p-datatable {
                &.p-datatable-customers {
                    .p-datatable-thead > tr > th,
                    .p-datatable-tfoot > tr > td {
                        display: none !important;
                    }

                    .p-datatable-tbody > tr {
                        border-bottom: 1px solid var(--layer-2);

                        > td {
                            text-align: left;
                            width: 100%;
                            display: flex;
                            align-items: center;
                            border: 0 none;

                            .p-column-title {
                                min-width: 30%;
                                display: inline-block;
                                font-weight: bold;
                            }

                            p-progressbar {
                                width: 100%;
                            }

                            &:last-child {
                                border-bottom: 1px solid var(--surface-d);
                            }
                        }
                    }
                }
            }
        }
    }
    `
  ],
  providers: [Customer]
})
export class App implements OnInit {
  items: any[] = [];
  value: any;

  pizza: string[] = [];

  search(event: AutoCompleteCompleteEvent) {
    this.items = [...Array(10).keys()].map(item => event.query + '-' + item);
  }
  //
  selectedCategories: any[] = [];

  categories: any[] = [
    { name: 'Accounting', key: 'A' },
    { name: 'Marketing', key: 'M' },
    { name: 'Production', key: 'P' },
    { name: 'Research', key: 'R' },
  ];
  date1: any;

  cities!: City[];

  selectedCities!: City[];
  ingredient: string = "Mushroom";
  //

  customers!: Customer[];

  selectedCustomers!: Customer[];

  representatives!: Representative[];

  statuses!: any[];

  loading: boolean = true;

  activityValues: number[] = [0, 100];
  public customerService = inject(Customer);
  public searchValue: any
  ngOnInit() {
    this.selectedCategories = [this.categories[1]];

    this.cities = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' }
    ];

    this.customerService.getCustomersLarge().then((customers: any) => {
      this.customers = customers;
      this.loading = false;

      this.customers.forEach((customer: any) => (customer.date = new Date(<Date>customer.date)));
    });

    this.representatives = [
      { name: 'Amy Elsner', image: 'amyelsner.png' },
      { name: 'Anna Fali', image: 'annafali.png' },
      { name: 'Asiya Javayant', image: 'asiyajavayant.png' },
      { name: 'Bernardo Dominic', image: 'bernardodominic.png' },
      { name: 'Elwin Sharvill', image: 'elwinsharvill.png' },
      { name: 'Ioni Bowcher', image: 'ionibowcher.png' },
      { name: 'Ivan Magalhaes', image: 'ivanmagalhaes.png' },
      { name: 'Onyama Limba', image: 'onyamalimba.png' },
      { name: 'Stephen Shaw', image: 'stephenshaw.png' },
      { name: 'Xuxue Feng', image: 'xuxuefeng.png' }
    ];

    this.statuses = [
      { label: 'Unqualified', value: 'unqualified' },
      { label: 'Qualified', value: 'qualified' },
      { label: 'New', value: 'new' },
      { label: 'Negotiation', value: 'negotiation' },
      { label: 'Renewal', value: 'renewal' },
      { label: 'Proposal', value: 'proposal' }
    ];
  }

  getSeverity(status: string): any {
    switch (status) {
      case 'unqualified':
        return 'danger';

      case 'qualified':
        return 'success';

      case 'new':
        return 'info';

      case 'negotiation':
        return 'warn';

      case 'renewal':
        return null;
    }
  }
  valuesa: any;
  Statusvalue:any;
  clear(event: any) { }
}
