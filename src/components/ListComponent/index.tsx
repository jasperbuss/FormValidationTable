import {testData} from './data';
import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import useStyles from './styles';
import {Order} from '../types/order';
import {stableSort, getComparator} from '../utils/sortUtils';
export interface TableData {
  id: number;
  location: string;
  type: string;
  device_health: string;
  last_used: string;
  price: string;
  color: string;
}

function createTableData(
  id: number,
  location: string,
  type: string,
  device_health: string,
  last_used: string,
  price: string,
  color: string
): TableData {
  return {id, location, type, device_health, last_used, price, color};
}

// creates content for the table rows from the given json object
const rows: TableData[] = testData.map(
  ({id, location, type, device_health, last_used, price, color}) => {
    return createTableData(
      id,
      location,
      type,
      device_health,
      last_used,
      price,
      color
    );
  }
);

interface IColumnHeaderProps {
  id: keyof TableData;
  label: string;
}

const columnHeader: IColumnHeaderProps[] = [
  {id: 'id', label: 'id'},
  {id: 'location', label: 'Location'},
  {id: 'type', label: 'Type'},
  {id: 'device_health', label: 'Device health'},
  {id: 'last_used', label: 'Last used'},
  {id: 'price', label: 'Price'},
];

export interface ITableProps {
  classes: ReturnType<typeof useStyles>;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof TableData
  ) => void;
  order: Order;
  orderBy: string;
}

function TableHeader(props: ITableProps) {
  const { order, orderBy, onRequestSort} = props;

  const createSortHandler = (property: keyof TableData) => (
    event: React.MouseEvent<unknown>
  ) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {columnHeader.map(headCell => (
          <TableCell
            key={headCell.id}
            align={'left'}
            padding={'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default function EnhancedTable() {
  const classes = useStyles();
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof TableData>('id');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleRequestSort = (
    event: React.MouseEvent<unknown, MouseEvent>,
    property: keyof TableData
  ) => {
    event.preventDefault();
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    newPage: number
  ) => {
    event && event.preventDefault();
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <TableContainer>
          <Table
            stickyHeader
            className={classes.table}
            aria-labelledby="tableTitle"
            size={'small'}
            aria-label="datatable"
          >
            <TableHeader
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(row => {
                  return (
                    <TableRow hover tabIndex={-1} key={row.id}>
                      <TableCell align="left">{row.id}</TableCell>
                      <TableCell align="left">{row.location}</TableCell>
                      <TableCell align="left">{row.type}</TableCell>
                      <TableCell align="left">{row.device_health}</TableCell>
                      <TableCell align="left">{row.last_used}</TableCell>
                      <TableCell align="left">{row.price}</TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
