"use client";
import * as React from 'react';
import {useEffect, useState} from "react";
import styles from './page.module.scss'
import {FileOpen, Settings, Person, CloudUploadOutlined, Search} from '@mui/icons-material';
import InputAdornment from '@mui/material/InputAdornment';
import classNames from "classnames";
import Tabs from "@/components/tabs";
import {File, Tab} from "@/types/types";
import axios from "axios";
import {Button, Input, TextField} from "@mui/material";
import InputFileUpload from "@/components/form-elements/file-upload";
import TableComponent from "@/components/table";

const tabList: Tab[] = [
    {
        label: 'All Files',
        value: 'all',
        disabled: false,
        icon: <FileOpen color={'primary'}/>
    },
    {
        label: 'Configurations',
        value: 'config',
        disabled: false,
        icon: <Settings color={'primary'}/>
    },
    {
        label: 'Team Members',
        value: 'members',
        disabled: false,
        icon: <Person color={'primary'}/>
    },
]

export default function Home() {
    const [tab, setTab] = useState<Tab>(tabList[0]);
    const [files, setFiles] = useState<File[] | null>(null);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalRecords, setTotalRecords] = useState<number>(0);
    const [search, setSearch] = useState<string>('');
    
    const getFiles = (filterByName: string, order: 'asc' | 'desc', page: number, pageSize: number, sortBy: 'name' | 'date' | 'comments') => {
        axios.get(`https://stoplight.io/mocks/coxit-test/test-api-fe-as/7728212/api/v1/drawings?page=${page}&pageSize=${pageSize}&sortBy=${sortBy}&order=${order}&filterByName=${filterByName}`, {
            headers: {
                'Accept': 'application/json',
                'Authorization': '123'
            }
        }).then(response => {
            setFiles(response.data.records)
            setTotalPages(response.data.totalPages)
            setTotalRecords(response.data.totalRecords)
        })
    }
    
    useEffect(() => {
        getFiles(search, 'asc', currentPage, 10, 'name')
    }, [currentPage, search]);
    
    return (
        <div>
            <header className={styles.header}>
                <div className={styles.header__left}>
                    <div className={styles.header__title}>
                        EXAMPLE
                    </div>
                    <Tabs tabList={tabList} selected={tab} onChange={setTab}/>
                </div>
                <div className={styles.header__right}>
                    <div className={styles.header__user}>
                        Reznichuk K.
                    </div>
                </div>
            </header>
            
            <main className={styles.main}>
                {tab.value === 'all' &&
                    <div className={styles.content}>
                        <div className={styles.top}>
                            <div className={styles.title}>
                                {tab.label} <span>{totalRecords}</span>
                            </div>
                            <div className={styles.search}>
                                <div className={styles.input}>
                                    <TextField
                                        id="search"
                                        style={{fontFamily: 'inherit', textTransform: 'none'}}
                                        placeholder="Search by name"
                                        variant="outlined"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        size={'small'}
                                        InputProps={
                                            {
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <Search color='primary'/>
                                                    </InputAdornment>
                                                )
                                            }
                                        }
                                    />
                                </div>
                                <InputFileUpload />
                            </div>
                        </div>
                        
                        <div className={styles.table}>
                            {!!files && <TableComponent totalPages={totalPages} page={currentPage} changePage={setCurrentPage} filesList={files}/>}
                        </div>
                    </div>
                }
            </main>
        </div>
    );
}
