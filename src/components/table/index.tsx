"use client";
import * as React from 'react';
import {useState} from "react";
import styles from './styles.module.scss'
import classNames from "classnames";
import {File} from "@/types/types";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import moment from "moment";
import Badge from "@mui/material/Badge";
import {Comment} from '@mui/icons-material';
import {Checkbox, Pagination} from "@mui/material";
import Button from "@mui/material/Button";
import Chip from '@mui/material/Chip';

interface TableProps {
    filesList: File[]
    page: number
    changePage: (value: number) => void
    totalPages: number
}

const TableComponent = (props: TableProps) => {
    
    const {filesList, page, totalPages, changePage} = props;
    const [selected, setSelected] = React.useState<readonly number[]>([]);
    
    const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected: readonly number[] = [];
        
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        setSelected(newSelected);
    };
    
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        changePage(value);
    };
    const isSelected = (id: number) => selected.indexOf(id) !== -1;
    return (
        
        <div>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow className={classNames(styles.row__head)}>
                            <TableCell className={classNames(styles.cell, styles.cell__head)}>Name</TableCell>
                            <TableCell className={classNames(styles.cell, styles.cell__head)}></TableCell>
                            <TableCell className={classNames(styles.cell, styles.cell__head)}>STATUS</TableCell>
                            <TableCell className={classNames(styles.cell, styles.cell__head)}>DATE</TableCell>
                            <TableCell className={classNames(styles.cell, styles.cell__head)}>SIZE</TableCell>
                            <TableCell className={classNames(styles.cell, styles.cell__head)}>COMMENT</TableCell>
                            <TableCell className={classNames(styles.cell, styles.cell__head)}></TableCell>
                            <TableCell className={classNames(styles.cell, styles.cell__head)}></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filesList.map((file: File, index) => (
                            <TableRow
                                role="checkbox"
                                key={file.id}
                                selected={isSelected(file.id)}
                                aria-checked={isSelected(file.id)}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                onClick={(event) => handleClick(event, file.id)}
                            >
                                <TableCell className={classNames(styles.cell)} component="th" scope="row">
                                    {file.name}
                                </TableCell>
                                <TableCell
                                    className={classNames(styles.cell)}>{file.owner === 'me' ? 'Reznichuk K.' : 'Olawa O.'}</TableCell>
                                <TableCell className={classNames(styles.cell, styles.cell__status)}>
                                    <Chip
                                        style={{fontFamily: 'inherit'}}
                                        label={file.status}
                                        color={file.status === "uploaded" ? 'warning' : 'primary'}
                                        variant='filled'
                                    />
                                </TableCell>
                                <TableCell
                                    className={classNames(styles.cell)}>{moment(new Date(file.date)).format("MMM DD, YYYY")}</TableCell>
                                <TableCell className={classNames(styles.cell)}>{file.size}</TableCell>
                                <TableCell className={classNames(styles.cell, styles.cell__comments)}>
                                    <Badge badgeContent={' '} color="secondary" variant="dot"
                                           invisible={file.comments === 0}>
                                        <Comment color={file.comments === 0 ? 'disabled' : 'primary'}/>
                                    </Badge>
                                    {file.comments}
                                </TableCell>
                                <TableCell
                                    className={classNames(styles.cell)}>
                                    {file.status === "uploaded" ?
                                        <Button
                                            variant="contained"
                                            tabIndex={-1}
                                            style={{fontFamily: 'inherit', textTransform: 'none'}}
                                        >
                                            Start processing
                                        </Button> : ''}
                                </TableCell>
                                <TableCell padding="checkbox" className={classNames(styles.cell)}>
                                    <Checkbox
                                        color="primary"
                                        checked={isSelected(file.id)}
                                        inputProps={{
                                            'aria-labelledby': `enhanced-table-checkbox-${index}`,
                                        }}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Pagination style={{borderTop: '3px solid #fff'}} count={totalPages} page={page} onChange={handleChange} shape="rounded"/>
        </div>
    
    );
}

export default TableComponent
