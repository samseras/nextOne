<template>
    <div class="document" v-loading="isShowFileLoading">
        <ScrollContainer>
            <el-table
                ref="multipleTable"
                :data="fileList"
                tooltip-effect="dark"
                style="width: 100%">
                <el-table-column
                    width="55">
                    <template slot-scope="scope">
                        <el-checkbox v-model="scope.row.checked" @change="checked(scope.row)"
                                     class="checkBoxBtn"></el-checkbox>
                    </template>
                </el-table-column>
                <el-table-column
                    label="文件名称">
                    <template slot-scope="scope">
                        <img :src="imgUrl(scope.row.type, scope.row.fileType)" alt="" @click="getMoreFile(scope.row)" class="floder">
                        <span @click="getMoreFile(scope.row)" class="floder">{{scope.row.name}}</span>
                    </template>
                </el-table-column>

                <el-table-column
                    label="时间">
                    <template slot-scope="scope">
                        <span>{{scope.row.createTime | timeFilter}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="描述">
                    <template slot-scope="scope">
                        <span class="description">{{scope.row.description}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="大小">
                    <template slot-scope="scope">
                        <span class="description">{{scope.row.size | humanize}}</span>
                    </template>
                </el-table-column>

                <el-table-column
                    label="操作">
                    <template slot-scope="scope">
                        <div class="handle">
                            <span @click="fixedInfo(scope.row)">编辑</span>
                            <span class="line">|</span>
                            <span @click="deleteFileHandle(scope.row.id)">删除</span>
                            <span class="line" v-if="scope.row.type === 1">|</span>
                            <span v-if="scope.row.type === 1" @click="showCheckFile(scope.row, '人员信息',true)">查看</span>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </ScrollContainer>
    </div>
</template>

<script>
    import ScrollContainer from '@/components/ScrollContainer'
    import moment from 'moment'
    import api from '@/api'
    export default {
        name: "document",
        data () {
            return {
                fileList: [],
                selectList: [],
                selectRowsList: [],
                isShowFileLoading: false,
                pageNum: 1,
                pageFileNumber: 15
            }
        },
        mounted() {
            this.getFolderList()
        },
        methods: {
            checked (row) {
                this.fileList = this.fileList.filter(item => {
                    if (item.id ===row.id) {
                        item.checked = item.checked
                    }
                    return item
                })
                if (this.selectList.includes(row.id)) {
                    this.selectList = this.selectList.filter(item => {
                        return item !== row.id
                    })
                    this.selectRowsList = this.selectRowsList.filter(item => {
                        return item.id !== row.id
                    })
                } else {
                    this.selectList.push(row.id)
                    this.selectRowsList.push(row)
                }
                // this.$store.commit('SELECT_FILE_LIST', this.selectRowsList)
            },
            fixedInfo (row) {
                row.time = new Date().getTime()
                if (row.type === 1) {
                    this.$emit('fixFileContent')
                } else {
                    this.$emit('fixFolderContent')
                }
                // this.$store.commit('SET_FIX_FILE', row)
            },
            getFolderList () {
                let type = this.$route.params.id
                this.isShowFileLoading = true
                api.file.getFloderList(type).then(res => {
                    this.isShowFileLoading = false
                    console.log(res, '这个是文件夹列表')
                    this.fileList = res
                    let obj = {
                        length: res.length,
                        time: new Date().getTime()
                    }
                    // this.$store.commit('SET_FILE_LIST_LENGTH', obj)
                    // this.$store.commit('FILE_LIST', this.fileList)
                    this.fileList.forEach(item => {
                        item.checked = false
                    })
                    // this.fileList = this.fileList.filter((item,index) => {
                    //     if (index < (this.pageNum * this.pageFileNumber ) && index > ((this.pageNum -1) * this.pageFileNumber ) - 1 ) {
                    //         return item
                    //     }
                    // })
                }).catch(err => {
                    console.log(err, '获取文件夹列表失败')
                    this.isShowFileLoading = false
                })
            },
            imgUrl (type, fileType) {
                let image = ''
                if (type == 0) {
                    image = require('~/assets/img/floder.svg')
                } else {
                    if (fileType.includes('doc')) {
                        image = require('~/assets/img/word.svg')
                    } else if (fileType.includes('xl')) {
                        image = require('~/assets/img/word.svg')
                    } else if (fileType.includes('ppt')) {
                        image = require('~/assets/img/ppt.svg')
                    } else if (fileType.includes('pdf')) {
                        image = require('~/assets/img/PDF.svg')
                    } else if (fileType.includes('txt')) {
                        image = require('~/assets/img/txt.svg')
                    }else if (fileType.includes('csv')) {
                        image = require('~/assets/img/excel.svg')
                    }else if (fileType.includes('jpg')) {
                        image = require('~/assets/img/jpg.svg')
                    }else if (fileType.includes('png')) {
                        image = require('~/assets/img/png.svg')
                    }else if (fileType.includes('svg')) {
                        image = require('~/assets/img/svg.svg')
                    } else {
                        image = require('~/assets/img/file.svg')
                    }
                }
                return image
            },
            getMoreFile (row) {
              console.log(row, '这个是点击的文件')
                this.isShowFileLoading = true
                if (row.type === 1) {
                    this.isShowFileLoading = false
                    return
                }
                api.file.getMoreFile(row.id).then(res => {
                    this.isShowFileLoading = false
                    console.log(res, '全部文件')
                    this.$store.commit('file/SetCrumba', row)
                    this.$store.commit('file/SetClickCrumba', {})
                    this.fileList = res
                    this.fileList.forEach(item => {
                        item.checked = false
                    })
                }).catch(err => {
                    console.log(err, '获取文件列表失败')
                    this.isShowFileLoading = false
                })
            },
            getFileList (item) {
                console.log(item)
                if (item.type == 0) {
                    api.file.getMoreFile(item.id).then(res => {
                        this.isShowFileLoading = false
                        console.log(res, '全部文件')
                        this.fileList = res
                        this.fileList.forEach(item => {
                            item.checked = false
                        })
                    }).catch(err => {
                        console.log(err, '获取文件列表失败')
                        this.isShowFileLoading = false
                    })
                } else {
                    this.getFolderList()
                }
            },
            deleteFileHandle (id) {
                if (id) {
                    this.selectList = [id]
                }
                if (this.selectList.length > 0) {
                    this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        api.file.deleteFile(this.selectList).then(res => {
                            console.log(res, '删除成功')
                            this.selectList = []
                            this.selectRowsList = []
                            res.forEach(item => {
                                if (item.code == 206) {
                                    this.$message.error('删除的文件夹中含有文件，请先删除或移除文件再进行删除！')
                                }
                            })
                            this.$store.commit('SELECT_FILE_LIST', this.selectRowsList)
                            this.$message.success('删除成功')
                            this.getFileList(this.getCrumbsList[this.getCrumbsList.length - 1])
                        }).catch(err => {
                            console.log(err, '删除失败')
                            this.$message.error('删除失败，请稍后重试')
                        })

                    }).catch(() => {
                        this.$message.info('取消删除')
                    })
                } else {
                    this.$message.error('请选择一条数据')
                }
            },
            searchFileList () {
                console.log(this.getSearchContent, ',.,.,.,,.,.,.,')
                this.isShowFileLoading = true
                let route = this.$route.params.id
                api.file.searchAnything(route, this.getSearchContent.content).then(res => {
                    this.isShowFileLoading = false
                    console.log(res, '请求回来的')
                    this.fileList = res
                    this.fileList.forEach(item => {
                        item.checked = false
                    })
                }).catch(err => {
                    console.log(err, '搜索失败')
                })
            },
            showCheckFile (rows) {
                let date = new Date().getTime()
                rows[date] = new Date().getTime()
                this.$store.commit('CHECK_FILE_ROW', rows)
            },
            selectAll () {
                if (this.getSelectAllState) {
                    this.selectList = []
                    this.selectRowsList = []
                    this.fileList = this.fileList.filter(item => {
                        item.checked = this.getSelectAllState.select
                        return item
                    })
                    if (this.getSelectAllState.select) {
                        this.selectList = this.fileList.map(item => {
                            return item.id
                        })
                        this.selectRowsList = this.fileList
                    }
                    this.$store.commit('SELECT_FILE_LIST', this.selectRowsList)
                }
            }
        },
        components: {
            ScrollContainer
        },
        filters: {
            timeFilter (time) {
                if (time) {
                    return moment(time).format('YYYY-MM-DD HH:mm:ss')
                }
            },
            humanize (size) {
                if (!size) {
                    return '--'
                }
                if (size < 1024 * 1024) {
                    return `${(size / 1024).toFixed(1)} K`
                }
                if (size < 1024 * 1024 * 1024) {
                    return `${(size / 1024 / 1024).toFixed(1)} M`
                }
                return `${(size / 1024 / 1024 / 1024).toFixed(1)} G`
            },
        },
        watch: {
            '$route' () {
                this.getFolderList()
            },
            '$store.state.file.clikCrumba' () {
              console.log(this.$store.state.file.clikCrumba, '点击的面包屑')
              if (this.$store.state.file.clikCrumba.id) {
                  this.getFileList(this.$store.state.file.clikCrumba)
              }
            }
        },
        computed: {
        }
    }
</script>

<style scoped lang="scss" type="text/scss">
    .document{
        width: 100%;
        height: 100%;
        img{
            display: inline-block;
            width: rem(20);
            height: rem(20);
            vertical-align: middle;
        }
        .floder{
            cursor: pointer;
        }
        .handle{
            span{
                cursor: pointer;
            }
        }
    }
</style>
