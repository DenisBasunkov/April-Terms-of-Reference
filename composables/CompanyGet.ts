import axios from "axios"

interface User {
    id: number,
    companyName: string,
    Date: Date,
    Color: string,
    Job: string,
    Avatar: string,
}

import { defineStore } from "pinia"

export const useCompanyStore = defineStore('CompanyStore', {
    state: () => ({
        CompanyList: <User[]>[],
        SearchText: '',
        PageId: 0,
        currentPage: 1,
        postPerPage: 8,
        lastPointIndex: 0,
        firstPostIndex: 1,
        PageCount: 0,
        isList: true,
        CompanyPage: <User>{}
    }),
    getters: {
        WatchedCompanyList(): User[] {
            const data = this.CompanyList.filter((item) => {
                return Object.entries(item).some(([key, value]) => {
                    const unSearch = ['id', "Avatar", 'Date'];
                    if (unSearch.includes(key)) {
                        return false
                    } else {
                        return value.toString().includes(this.SearchText)
                    }
                })
            });
            this.lastPointIndex = this.currentPage * this.postPerPage;
            this.firstPostIndex = this.lastPointIndex - this.postPerPage;
            this.PageCount = data.length / this.postPerPage;
            return data.slice(this.firstPostIndex, this.lastPointIndex)

        },
        getPageCount(): number {
            return this.PageCount = this.WatchedCompanyList.length / this.postPerPage;
        },
        getCompanyLength(): number {
            return this.PageCount
        },
        WatchedCompanyPage(): User {
            return this.CompanyPage;
        }
    },
    actions: {
        setSearchCompany(text: string) {
            this.SearchText = text;
        },
        setPageID(id: number) {
            this.PageId = id;
        },
        setCompanyList(data: User[]) {
            this.CompanyList = data;
        },
        setCurrentPage(page: number) {
            // this.lastPointIndex = this.currentPage * this.postPerPage;
            // this.firstPostIndex = this.lastPointIndex - this.postPerPage;
            this.currentPage = page;
        },
        setIncreasePostPerPage(page: number) {
            this.postPerPage = page;
            this.lastPointIndex = this.currentPage * page;
            this.firstPostIndex = this.lastPointIndex - page;
            this.PageCount = this.CompanyList.length / page;
        },
        setDecreasePostPerPage(page: number) {
            this.postPerPage = page;
            this.lastPointIndex = this.currentPage * page;
            this.firstPostIndex = this.lastPointIndex - page;
            this.PageCount = this.CompanyList.length / page;
        },
        setIsList(isList_vall: boolean) {
            this.isList = isList_vall
        },
        setCompanyPage(data: User) {
            this.CompanyPage = data
        }
    }
})

export function useCompany() {
    const list = useCompanyStore()

    const setPage = (data: object) => {
        list.setCompanyPage(data as User)
    }

    const getCompanyAxios = async () => {
        await axios.get<User[]>('https://6661c94f63e6a0189feb9046.mockapi.io/listUser').then(({ data }) => {
            list.setCompanyList(data)
        })
    }
    return {
        setPage,
        getCompanyAxios
    }
}