import * as React from "react";
import { TableHead, TableCell, TableSortLabel, useTheme } from "@material-ui/core";
import { TableRow } from "material-ui";
import {TableData, Order} from './index';
import useStyles from './styles';

export interface ITableProps {
    onRequestSort: (event: React.MouseEvent<unknown, MouseEvent>, property: keyof TableData) => void;
    order: Order;
    orderBy: keyof TableData;
    classes: Record<string, string>;
  }
  
  const THeader:React.FC<ITableProps> = (props: ITableProps) => {
    interface IColumnHeaderProps {
        id: keyof TableData;
        label: string;
        numeric: boolean;
      }
      
      const columnHeader: IColumnHeaderProps[] = [
        { id: 'id', numeric: false, label: 'id' },
        { id: 'location', numeric: false, label: 'Location' },
        { id: 'type', numeric: false, label: 'Type' },
        { id: 'device_health', numeric: false,  label: 'Device health' },
        { id: 'last_used', numeric: false,  label: 'Last used' },
        { id: 'price', numeric: false,  label: 'Price' },
      ];

    const {  order, orderBy, onRequestSort } = props;
    const createSortHandler = (property: keyof TableData) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };
    return (
      <TableHead>
        <TableRow>
          {columnHeader.map(headCell => (
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? 'right' : 'left'}
              padding={'default'}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <span >
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </span>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }
  export default THeader;


//   import React from 'react';
// import {myData} from './data';
// import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
// import TableContainer from '@material-ui/core/TableContainer';
// import TablePagination from '@material-ui/core/TablePagination';
// import TableRow from '@material-ui/core/TableRow';
// import Paper from '@material-ui/core/Paper';
// import useStyles from './styles';
// import THeader from "./TableHeader";

// export interface ITableDataProps {
//   id: number;
//   location: string;
//   type: string;
//   device_health: string;
//   last_used: string;
//   price:string;
//   color:string;
// }

// export type Order = 'asc' | 'desc';

// interface IColumnHeaderProps {
//   id: keyof ITableDataProps;
//   label: string;
//   numeric: boolean;
// }
// export default function EnhancedTable() {
//   const classes = useStyles();
//   const [order, setOrder] = React.useState<Order>('asc');
//   const [orderBy, setOrderBy] = React.useState<keyof ITableDataProps>('id');
//   const [page, setPage] = React.useState(0);
//   const [rowsPerPage, setRowsPerPage] = React.useState(10);

//   const createTableData = (id:number, location:string, type:string, device_health:string, last_used:string, price:string,color:string): ITableDataProps => {
//     return { id, location, type, device_health, last_used, price, color};
//   }

//   // creates content for the table rows from the given json object
//   const rows:ITableDataProps[] =  myData.map(({ id, location, type, device_health, last_used, price, color}) =>{
//       return (
//           createTableData(id, location, type, device_health, last_used, price, color)
//       );
//   }) 
//     // basic sort function according to the order state
// function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
//     if (b[orderBy] < a[orderBy]) {
//       return -1;
//     }
//     if (b[orderBy] > a[orderBy]) {
//       return 1;
//     }
//     return 0;
//   }
  
//   function getComparator<Key extends keyof any>(
//     order: Order,
//     orderBy: Key,
//   ): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
//     return order === 'desc'
//       ? (a, b) => descendingComparator(a, b, orderBy)
//       : (a, b) => -descendingComparator(a, b, orderBy);
//   }
  
//   function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
//     const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
//     stabilizedThis.sort((a, b) => {
//       const order = comparator(a[0], b[0]);
//       if (order !== 0) return order;
//       return a[1] - b[1];
//     });
//     return stabilizedThis.map(el => el[0]);
//   }
//   const handleRequestSort = (event: React.MouseEvent<unknown, MouseEvent>, property: keyof ITableDataProps) => {
//     event.preventDefault();
//     const isAsc = orderBy === property && order === 'asc';
//     setOrder(isAsc ? 'desc' : 'asc');
//     setOrderBy(property);
//   };

//   const handleChangePage = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number) => {
//     event && event.preventDefault();
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   return (
//     <div className={classes.root}>
//       <Paper className={classes.paper}>
//         <TableContainer>
//           <Table
//             stickyHeader
//             className={classes.table}
//             aria-labelledby="tableTitle"
//             size={'small'}
//             aria-label="datatable"
//           >
//             {/* <THeader
//               classes={classes}
//               order={order}
//               orderBy={orderBy}
//               onRequestSort={handleRequestSort}
//             /> */}
//             <TableBody>
//               {stableSort(rows, getComparator(order, orderBy))
//                 .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                 .map((row) => {
//                   return (
//                     <TableRow
//                       hover
//                       tabIndex={-1}
//                       key={row.id}
//                     >
//                       <TableCell align="left">{row.id}</TableCell>
//                       <TableCell align="left">{row.location}</TableCell>
//                       <TableCell align="left">{row.type}</TableCell>
//                       <TableCell align="left">{row.device_health}</TableCell>
//                       <TableCell align="left">{row.last_used}</TableCell>
//                       <TableCell align="left">{row.price}</TableCell>
//                     </TableRow>
//                   );
//                 })}
//             </TableBody>
//           </Table>
//         </TableContainer>
//         <TablePagination
//           rowsPerPageOptions={[10, 25, 100]}
//           component="div"
//           count={rows.length}
//           rowsPerPage={rowsPerPage}
//           page={page}
//           onChangePage={handleChangePage}
//           onChangeRowsPerPage={handleChangeRowsPerPage}
//         />
//       </Paper>
//     </div>
//   );
// }