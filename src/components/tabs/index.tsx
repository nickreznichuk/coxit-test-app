"use client";
import * as React from 'react';
import {useState} from "react";
import styles from './styles.module.scss'
import {FileOpen, Settings, Person} from '@mui/icons-material';
import classNames from "classnames";
import {Tab} from "@/types/types";

interface TabsProps {
    tabList: Tab[]
    selected: Tab
    onChange: (tab: Tab) => void
}

const Tabs = (props: TabsProps) => {
    const {tabList, selected, onChange} = props;
    
    return (
        
        <div className={styles.tabs}>
            {tabList.map((tab: Tab) => (
                <div
                    key={tab.value}
                    className={classNames(styles.tabs__el, selected.value === tab.value && styles.tabs__el_active, tab.disabled && styles.tabs__el_disabled)}
                    onClick={() => tab.disabled || onChange(tab)}
                >
                    {tab.icon} {tab.label}
                </div>
            ))}
        </div>
    
    );
}

export default Tabs
