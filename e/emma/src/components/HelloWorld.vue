<template>
  <div class="hello">
     <!-- <div class="loading"> -->
        <div class="header">
            <div class="hd_left">
                <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
                    <el-menu-item index="1">Emma医疗管理</el-menu-item>
                </el-menu>
            </div>
            <div class="hd_right">
                <span>
                    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
                        <!-- <el-menu-item index="2" class="clean_cache">清除缓存</el-menu-item> -->
                        <el-submenu index="3">
                            <template slot="title">用户名</template>
                            <el-menu-item index="2-1">
                                <i class="el-icon-view"></i>个人信息</el-menu-item>
                            <el-menu-item index="2-2">
                                <i class="el-icon-view"></i>设置</el-menu-item>
                            <el-menu-item index="2-3">
                                <i class="el-icon-view"></i>锁屏（Alt+L）</el-menu-item>
                            <el-menu-item index="2-4">
                                <i class="el-icon-view"></i>注销</el-menu-item>
                            <!-- <el-submenu index="2-4">
                                    <i class="el-icon-view"></i>注销
                                </el-submenu> -->
                        </el-submenu>
                    </el-menu>
                </span>
            </div>
            <div class="clearfix"></div>
        </div>
        <nav class="big_box">

            <div class="nav_right">
                <div class="guide">
                    <!-- nav-trigger -->
                    <div class="theme" :class="{'select-nav':(navFault==1)}" @click="navList(1)">
                        <span :class="{'navTheme':(navFault==1)}">
                            <i class="el-icon-menu"></i>
                            <a>部位管理</a>
                        </span>
                    </div>
                    <div class="theme" :class="{'select-nav':(navFault==2)}" @click="navList(2)">
                        <span :class="{'navTheme':(navFault==2)}">
                            <i class="el-icon-menu"></i>
                            <a>感觉/程度管理</a>
                        </span>
                    </div>
                    <div class="theme" :class="{'select-nav':(navFault==3)}" @click="navList(3)">
                        <span :class="{'navTheme':(navFault==3)}">
                            <i class="el-icon-menu"></i>
                            <a>病症管理</a>
                        </span>
                    </div>
                    <div class="theme" :class="{'select-nav':(navFault==4)}" @click="navList(4)">
                        <span :class="{'navTheme':(navFault==4)}">
                            <i class="el-icon-menu"></i>
                            <a>科室管理</a>
                        </span>
                    </div>
                    <div class="theme" :class="{'select-nav':(navFault==5)}" @click="navList(5)">
                        <span :class="{'navTheme':(navFault==5)}">
                            <i class="el-icon-menu"></i>
                            <a>问题组合权重修改</a>
                        </span>
                    </div>
                    <div class="theme" :class="{'select-nav':(navFault==6)}" @click="navList(6)">
                        <span :class="{'navTheme':(navFault==6)}">
                            <i class="el-icon-view"></i>
                            <a>问诊测试</a>
                        </span>
                    </div>
                    <div class="theme" :class="{'select-nav':(navFault==7)}" @click="navList(7)">
                        <span :class="{'navTheme':(navFault==7)}">
                            <i class="el-icon-service"></i>
                            <a>测试录音返回</a>
                        </span>
                    </div>
                    <div class="theme" :class="{'select-nav':(navFault==8)}" @click="navList(8)">
                            <span :class="{'navTheme':(navFault==8)}">
                                <i class="el-icon-document"></i>
                                <a>添加对话</a>
                           </span>
                    </div>
                    <div class="themeText" v-show='navFault==1'>
                        <div class="add_btn tab-top2">
                            <el-button type="primary" icon="el-icon-circle-plus" plain @click="dialogBodyVisible = true">
                                添加</el-button>
                            <el-button type="success" plain icon="el-icon-circle-plus-outline">
                                导入同义词数据</el-button>
                        </div>
                        <!-- <el-form-item label="" prop="fenLei">
                            <el-row style="height: 35px;" type="flex" align="middle">
                                <el-col :span="3" style="width: 90px;">
                                <div class="el-form-item__label" style="padding-bottom: 0;"> 活动分类</div>
                                </el-col>
                                <el-col  class="" :span="2">
                                <el-button type="text" @click.native="dialogFormFenLeiVisible = true" style="margin: 0;padding: 0;">设置</el-button>
                                </el-col>
                            </el-row>
                            <el-radio-group v-model="ruleForm.fenLei" >
                                <el-radio v-for="item of ruleForm.fenLeis" :label="item.name"></el-radio>
                            </el-radio-group>
                        </el-form-item> -->
                        <template class="body_tableData tab_top">
                        <el-table :data="tableData1.slice((currentPage-1)*pagesize,currentPage*pagesize)"  border style="width: 100%" :row-class-name="tableRowClassName">
                            <el-table-column fixed  label="序号" prop="id" width="180"></el-table-column>
                            <el-table-column  label="名称" prop="name"  sortable width="321" >
                            </el-table-column>
                            <el-table-column label="代码" prop="code" sortable width="220">
                            </el-table-column>
                            <el-table-column  label="父id" prop="pid" sortable width="220">
                            </el-table-column>
                            <el-table-column label="操作" width="350">
                                <template slot-scope="scope">
                                    <!-- <el-button icon="el-icon-edit" type="primary" plain @click="handleClick(scope.row)">编辑</el-button> -->
                                   <el-button icon="el-icon-edit" type="primary" plain @click="editBodyMsg(scope.$index, scope.row)">编辑</el-button>
                                   <el-button type="danger" @click="delBodyMsg(scope.$index, tableData1)" plain icon="el-icon-delete">删除</el-button>
                                </template>
                            </el-table-column>
                         </el-table>
                        </template>
                        <div class="block tab_top">
                            <el-pagination 
                              @size-change="handleSizeChange" 
                              @current-change="handleCurrentChange" 
                              :current-page="currentPage" 
                              :page-sizes="[10, 20, 30, 40]"
                              :page-size="pagesize" background 
                              layout="total, sizes, prev, pager, next, jumper" 
                              :total="totalCount">
                            </el-pagination>
                        </div>
                        <!-- 添加 -->
                        <el-dialog title="部位管理-添加" :visible.sync="dialogBodyVisible" width="60%" :before-close="addClose">
                           
                           <el-form ref="bodyAddform" :rules="Addrules" :model="bodyAddform" label-width="100px" class="demo-ruleForm">
                                <el-form-item label="部位名" prop="name">
                                    <el-input v-model="bodyAddform.name"></el-input>
                                </el-form-item>
                                <el-form-item label="代号" prop="code">
                                    <el-input v-model="bodyAddform.name"></el-input>
                                </el-form-item>
                                <el-form-item label="父类" prop="bodyRule">
                                    <el-select placeholder="请选择父类" v-model="bodyAddform.bodyRule">
                                    <el-option label="无父类" value="无父类"></el-option>
                                    <el-option :lable="fulei.name" :value="fulei.name" v-for="fulei in bodyRule" :key="fulei.id">
                                    </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="类型" prop="type">
                                    <el-radio-group v-model="bodyAddform.type">
                                        <el-radio label="身体部位"></el-radio>
                                        <el-radio label="分泌物"></el-radio>
                                        <el-radio label="其他"></el-radio>
                                    </el-radio-group>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" @click="submitBodyForm('bodyAddform.name,bodyAddform')" icon="el-icon-upload">立即提交</el-button>
                                     <el-button type="info" @click="resetForm('bodyAddform.name,bodyAddform,')" icon="el-icon-refresh">重置</el-button>
                                </el-form-item>
                            </el-form>
                        </el-dialog>

                         <el-dialog title="部位管理-编辑" :visible.sync="dialogFixBodyVisible" width="60%" :before-close="addClose">
                             <el-form ref="bodyAddform" :rules="Addrules" :model="bodyAddform" label-width="100px" class="demo-ruleForm">
                                <el-form-item label="部位名" prop="name">
                                    <el-input v-model="bodyAddform.name"></el-input>
                                </el-form-item>
                                <el-form-item label="代号" prop="code">
                                    <el-input v-model="bodyAddform.code"></el-input>
                                </el-form-item>
                                <el-form-item label="父类" prop="bodyRule">
                                    <el-select placeholder="请选择父类" v-model="bodyAddform.bodyRule">
                                        <el-option label="无父类" value="无父类"></el-option>
                                        <el-option :lable="fulei.name" :value="fulei.name" v-for="fulei in bodyRule" :key="fulei.id">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="类型" prop="type">
                                    <el-radio-group v-model="bodyAddform.type">
                                    <el-radio label="身体部位" value="0"></el-radio>
                                    <el-radio label="分泌物" value="1"></el-radio>
                                    <el-radio label="其他" value=""></el-radio>
                                    </el-radio-group>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" @click="submitBodyForm('bodyAddform')" icon="el-icon-upload">立即提交</el-button>
                                   
                                </el-form-item>
                            </el-form>
                        </el-dialog>
                    </div>
                    <div class="themeText" v-show='navFault==2'>
                        <el-button type="primary" icon="el-icon-circle-plus" plain @click="dialogFeelVisible = true">
                            添加</el-button>
                        <el-button type="success" plain icon="el-icon-circle-plus-outline">
                            导入同义词数据</el-button>
                        <div class="feel_table tab_top">
                            <template>
                                <el-table :row-class-name="tableRowClassName" 
                                :model="feelRule" :data="tableData2.slice((currentPage-1)*pagesize,currentPage*pagesize)" border style="width: 100%" 
                                :default-sort="{prop: 'date', order: 'descending'}">
                                    <el-table-column prop="id" label="序号" width="180">
                                    </el-table-column>
                                    <el-table-column prop="name" label="名称" sortable width="351">
                                    </el-table-column>
                                    <el-table-column prop="pid" label="父id" sortable width="270">
                                    </el-table-column>
                                    <el-table-column label="操作" width="350">
                                        <template slot-scope="scope">
                                            <el-button icon="el-icon-edit" type="primary" plain @click="feelEdit(scope.$index, scope.row)">编辑</el-button>
                                            <el-button type="danger" @click="feelDel(scope.$index, tableData2)" plain icon="el-icon-delete">删除</el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </template>
                           <div class="block tab_top">
                            <el-pagination 
                                @size-change="handleSizeChange" 
                                @current-change="handleCurrentChange" 
                                :current-page="currentPage" 
                                :page-sizes="[10, 20, 30, 40]"
                                :page-size="pagesize" background 
                                layout="total, sizes, prev, pager, next, jumper" 
                                :total="totalCount2">
                            </el-pagination>
                        </div>
                            <!-- 添加 -->
                            <el-dialog title="感觉/程度-添加" :visible.sync="dialogFeelVisible" width="60%" :before-close="addClose">
                                <el-form ref="feelAddform" :rules="Addrules" :model="feelAddform" label-width="100px" class="demo-ruleForm">
                                    <el-form-item label="部位名" prop="name">
                                        <el-input v-model="feelAddform.name"></el-input>
                                    </el-form-item>
                                    <el-form-item label="父类" prop="feelRule">
                                        <el-select placeholder="请选择父类" v-model="feelAddform.feelRule">
                                        <el-option label="无父类" value="无父类"></el-option>
                                        <el-option :lable="fulei.name" :value="fulei.name" v-for="fulei in feelRule" :key="fulei.id">
                                        </el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="类型" prop="type">
                                        <el-radio-group v-model="feelAddform.type">
                                        <el-radio label="感觉"></el-radio>
                                        <el-radio label="程度"></el-radio>
                                        </el-radio-group>
                                    </el-form-item>
                                    <el-form-item>
                                        <el-button type="primary" @click="submitfeelForm('feelAddform')" icon="el-icon-upload">立即提交</el-button>
                                        <el-button type="info" @click="resetForm('feelAddform')" icon="el-icon-refresh">重置</el-button>
                                    </el-form-item>
                                </el-form>
                           
                            </el-dialog>
                        </div>
                    </div>
                    <div class="themeText" v-show='navFault==3'>
                        <el-button type="primary" icon="el-icon-circle-plus" plain @click="dialogIllFormVisible = true">
                            添加</el-button>
                        <el-button type="success" plain icon="el-icon-circle-plus-outline">
                            导入文档</el-button>
                        <div class="ill_table tab_top">
                            <template class="body_tableData">
                                <el-table :data="tableData3.slice((currentPage-1)*pagesize,currentPage*pagesize)" :row-class-name="tableRowClassName" border style="width: 100%">
                                    <el-table-column fixed prop="id" label="序号" width="180">
                                    </el-table-column>
                                    <el-table-column prop="name" label="名称" sortable width="321">
                                    </el-table-column>
                                    <el-table-column prop="channelName" label="所属科室" sortable width="220">
                                    </el-table-column>
                                    <el-table-column prop="num" label="症状表现次数" sortable width="220">
                                    </el-table-column>
                                    <el-table-column prop="code" label="频率" width="220">
                                    </el-table-column>
                                    <el-table-column fixed="right" label="操作" width="350">
                                        <template slot-scope="scope">
                                            <el-button icon="el-icon-edit" type="primary" plain>编辑</el-button>
                                            <el-button type="danger" @click="bingDel(scope.$index, tableData3)" plain icon="el-icon-delete">删除</el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </template>
                            <div class="block tab_top">
                            <el-pagination 
                                @size-change="handleSizeChange" 
                                @current-change="handleCurrentChange" 
                                :current-page="currentPage" 
                                :page-sizes="[10, 20, 30, 40]"
                                :page-size="pagesize" background 
                                layout="total, sizes, prev, pager, next, jumper" 
                                :total="totalCount3">
                            </el-pagination>
                        </div>
                        </div>
                        <el-dialog title="添加" :visible.sync="dialogIllFormVisible" width="60%">
                                <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="100px" class="demo-dynamic">
                                    <el-form-item
                                        prop="text"
                                        label="诊断建议"
                                        :rules="[
                                        { required: true, message: '请输入建议方案', trigger: 'blur' },
                                        ]"
                                    >
                                        <el-input v-model="dynamicValidateForm.text"></el-input>
                                    </el-form-item>
                                     <el-form-item label="科室名称" prop="bodyRule">
                                        <el-select placeholder="请选择科室" v-model="dynamicValidateForm.offRule">
                                            <el-option label="无科室" value="无科室"></el-option>
                                            <el-option :lable="fulei.name" :value="fulei.name" v-for="fulei in offRule" :key="fulei.id">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                  
                                    <el-form-item
                                        v-for="(domain, index) in dynamicValidateForm.domains"
                                        :label="'添加病症' + index"
                                        :key="domain.key"
                                        :prop="'domains.' + index + '.value'"
                                        :rules="{
                                        required: true, message: '填写不能为空', trigger: 'blur'
                                        }"
                                    >
                                         <el-form-item label="病症表现部位" prop="offRule">
                                        <el-select placeholder="请选择部位" v-model="dynamicValidateForm.offRule">
                                            <el-option label="无明显部位" value="无父类"></el-option>
                                            <el-option :lable="fulei.name" :value="fulei.name" v-for="fulei in bodyRule" :key="fulei.id">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="病症表现情况" prop="feelRule">
                                        <el-select placeholder="请选择感觉" v-model="dynamicValidateForm.feelRule">
                                        <el-option label="无明显感觉" value="无明显感觉"></el-option>
                                        <el-option :lable="fulei.name" :value="fulei.name" v-for="fulei in feelRule" :key="fulei.id">
                                        </el-option>
                                        </el-select>
                                    </el-form-item>
                                     <el-form-item
                                            label="排序数字大的靠前"
                                            prop="number"
                                            :rules="[
                                            { required: true, message: '不能为空'},
                                            { type: 'number', message: '必须为数字值'}
                                            ]"
                                        >
                                            <el-input type="age" v-model.number="dynamicValidateForm.age" auto-complete="off"></el-input>
                                        </el-form-item>
                                         <el-form-item
                                        prop="qest"
                                        label="问题"
                                        :rules="[
                                        { required: true, message: '请输入问题描述', trigger: 'blur' },
                                        ]"
                                    >
                                        <el-input v-model="dynamicValidateForm.qest"></el-input>
                                    </el-form-item>
                                        <el-button @click.prevent="removeDomain(domain)">删除</el-button>
                                    </el-form-item>
                                    <el-form-item>
                                        <el-button type="primary" @click="submitForm('dynamicValidateForm')">提交</el-button>
                                        <el-button @click="addDomain">添加新病症表现</el-button>
                                        <el-button @click="resetForm('dynamicValidateForm')">重置</el-button>
                                    </el-form-item>
                                </el-form>
                        </el-dialog>
                    </div>
                    <div class="themeText" v-show='navFault==4'>
                        <el-button type="primary" icon="el-icon-circle-plus" plain @click="dialogOfficeVisible = true">
                            添加</el-button>
                        <div class="office_table tab_top">
                            <template class="body_tableData">
                                <el-table :data="tableData4.slice((currentPage-1)*pagesize,currentPage*pagesize)" :row-class-name="tableRowClassName" border style="width: 100%">
                                    <el-table-column fixed prop="date" label="序号" width="180">
                                    </el-table-column>
                                    <el-table-column prop="id" label="id" width="220">
                                    </el-table-column>
                                    <el-table-column prop="name" label="科室名称" sortable width="321">
                                    </el-table-column>
                                    <el-table-column prop="code" label="代码" sortable width="220">
                                    </el-table-column>
                                    <el-table-column fixed="right" label="操作" width="550">
                                        <template slot-scope="scope">
                                            <el-button icon="el-icon-edit" type="primary" plain>编辑</el-button>
                                            <el-button type="danger" @click="officeDel(scope.$index, tableData4)" plain icon="el-icon-delete">删除</el-button>
                                            <el-button type="warning" plain icon="el-icon-edit-outline" @click="dialogFixUpVisible = true" >修改</el-button>
                                            <el-button type="success" icon="el-icon-search" @click="outerVisible = true" plain>查看科室组合详情</el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </template>
                          <div class="block tab_top">
                                <el-pagination 
                                @size-change="handleSizeChange" 
                                @current-change="handleCurrentChange" 
                                :current-page="currentPage" 
                                :page-sizes="[10, 20, 30, 40]"
                                :page-size="pagesize" background 
                                layout="total, sizes, prev, pager, next, jumper" 
                                :total="totalCount4">
                                </el-pagination>
                            </div>
                        </div>

                        <el-dialog title="添加" :visible.sync="dialogOfficeVisible" width="60%" :before-close="addClose">
                            <!-- 弹窗内容 -->
                            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                                <el-form-item label="科室名" prop="name">
                                    <el-input v-model="ruleForm.name"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" @click="submitForm('ruleForm')" icon="el-icon-upload">立即提交</el-button>
                                    <el-button type="info" @click="resetForm('ruleForm')" icon="el-icon-refresh">重置</el-button>
                                </el-form-item>
                            </el-form>
                        </el-dialog>
                        <!-- 1-4.3科室管理-修改-弹窗 -->
                        <el-dialog title="修改" :visible.sync="dialogFixUpVisible" width="60%">
                            <!-- <el-form :model="FixUpValidateForm" ref="FixUpValidateForm" label-width="100px" class="demo-dynamic">
                                <el-form-item prop="keshiName" label="科室名" :rules="[
                                        { required: true, message: '请输入', trigger: 'blur' },
                                        { message: '请输入正确的科室名', trigger: 'blur,change' }
                                        ]">
                                    <el-input v-model="dynamicValidateForm.email"></el-input>
                                </el-form-item>
                                <el-form-item  
                                    :rules="{
                                            required: true, message: '不能为空', trigger: 'blur'
                                        }">
                                    <el-form-item label="病症表现部位" :rules="{
                                            required: true, message: '不能为空', trigger: 'blur'
                                        }">
                                        <el-select v-model="domain.value" placeholder="请选择身体部位">
                                            <el-option label="无科室" value="shanghai"></el-option>
                                            <el-option label="区域二" value="beijing"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="病症表现情况" :rules="{
                                            required: true, message: '不能为空', trigger: 'blur'
                                        }">
                                        <el-select v-model="domain.value" placeholder="请选择表现状态">
                                            <el-option label="无科室" value="shanghai"></el-option>
                                            <el-option label="区域二" value="beijing"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-button @click.prevent="removeFixUpDomain(domain)" type="danger" plain icon="el-icon-delete">删除</el-button>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" @click="submitFixUpForm('FixUpValidateForm')" icon="el-icon-upload">立即提交</el-button>
                                    <el-button type="success" plain @click="addFixUpDomain" icon="el-icon-circle-plus-outline">添加新病症表现</el-button>
                                    <el-button type="info" @click="resetFixUpForm('FixUpValidateForm')" icon="el-icon-refresh">重置</el-button>
                                </el-form-item>
                            </el-form> -->
                        </el-dialog>
                        <!-- 1-4.4科室管理-查看科室组合详情-弹窗 -->
                        <template>
                            <el-dialog title="外层 Dialog" :visible.sync="outerVisible">
                                <!-- 1-4.4科室管理-查看科室组合详情-添加组合-内层弹窗 -->
                                <div class="erDialog">
                                    <el-dialog width="50%" title="添加组合" :visible.sync="innerVisible" append-to-body>
                                        <el-form :model="addOnes" ref="addOnes" label-width="100px" class="demo-dynamic">

                                            <el-form-item v-for="(one, index) in addOnes.ones" :label="'.' + index" :key="one.key" :prop="'ones.' + index + '.value'"
                                                :rules="{
                                                            required: true, message: '不能为空', trigger: 'blur'
                                                        }">
                                                <el-form-item label="病症表现部位" :rules="{
                                                            required: true, message: '不能为空', trigger: 'blur'
                                                        }">
                                                    <el-select v-model="one.value" placeholder="请选择身体部位">
                                                        <el-option label="无科室" value="shanghai"></el-option>
                                                        <el-option label="区域二" value="beijing"></el-option>
                                                    </el-select>
                                                </el-form-item>
                                                <el-form-item label="病症表现情况" :rules="{
                                                            required: true, message: '不能为空', trigger: 'blur'
                                                        }">
                                                    <el-select v-model="one.value" placeholder="请选择表现状态">
                                                        <el-option label="无科室" value="shanghai"></el-option>
                                                        <el-option label="区域二" value="beijing"></el-option>
                                                    </el-select>
                                                </el-form-item>
                                                <el-button @click.prevent="removeOneDomain(one)" type="danger" plain icon="el-icon-delete">删除</el-button>
                                            </el-form-item>
                                            <el-form-item>
                                                <el-button type="primary" @click="submitOneForm('addOnes')" icon="el-icon-uploads">立即提交</el-button>
                                                <el-button type="success" plain @click="addOneDomain" icon="el-icon-circle-plus-outline">添加新病症表现</el-button>
                                                <el-button type="info" @click="resetOneForm('addOnes')" icon="el-icon-refresh">重置</el-button>
                                            </el-form-item>
                                        </el-form>
                                    </el-dialog>
                                </div>
                                <div slot="footer" class="dialog-footer">
                                    <span class="col6">操作：</span>
                                    <el-button type="primary" plain>编辑</el-button>
                                    <el-button type="danger" plain>删除</el-button>
                                    <el-button type="primary" plain @click="innerVisible = true">添加组合</el-button>
                                </div>
                            </el-dialog>
                        </template>
                    </div>
                    <div class="themeText" v-show='navFault==5'>
                        <div class="weightSets tab_top col6">
                            <el-row :gutter="30" class="the_leader">
                                <el-col :span="2">
                                    <div class="bg_bod">
                                        <em class="the_bod">部位</em>
                                    </div>
                                </el-col>
                                <el-col :span="5">
                                    <div class="bg_bod">
                                        <em class="the_bod">1.第一个选择</em>
                                    </div>
                                </el-col>
                                <el-col :span="2">
                                    <div class="bg_fel">
                                        <em class="the_fel">感觉</em>
                                    </div>
                                </el-col>
                                <el-col :span="5">
                                    <div class="bg_fel">
                                        <em class="the_fel">2.第二个选择</em>
                                    </div>
                                </el-col>
                                <el-col :span="2">
                                    <div class="bg_off">
                                        <em class="the_fel">科室</em>
                                    </div>
                                </el-col>

                                <el-col :span="8">
                                    <div class="bg_off">
                                        <em class="the_off">3.确认添加</em>
                                    </div>
                                </el-col>
                            </el-row>
                            <el-container class="weight">
                                <el-aside class="txt_bod" width="19rem">
                                    <div class="father" @click="quanList()">
                                        <a  v-for="bu in buwei" :key="bu.id">
                                            <p class="qestName"><span >{{bu.name}}</span></p>
                                        </a>
                                    </div>
                                     <!-- <div class="content">
                                         <li>李子</li>
                                         <li>梨子</li>
                                         <li>荔枝</li>
                                     </div> -->
                                </el-aside>
                                <el-aside class="txt_fel" width="19rem">
                                    <p class="tab_top2 current2">升高</p>
                                    <p class="tab_top">降低</p>
                                </el-aside>
                                <el-main class="txt_man">
                                    <p>
                                        ——---——-|+--——--—-
                                        <el-button class="key_add" type="primary" plain>添加</el-button>

                                        -—---——--+|-——--——
                                    </p>
                                    <template>
                                        <el-table :data="tableData" style="width: 100%">
                                            <el-table-column label="科室id" width="120">
                                                <template slot-scope="scope">
                                                    <i class="el-icon-time"></i>
                                                    <span style="margin-left: 10px">{{ scope.row.date }}</span>
                                                </template>
                                            </el-table-column>

                                            <el-table-column label="科室名称" width="180">
                                                <template slot-scope="scope">
                                                    <el-popover trigger="hover" placement="top">
                                                        <p>姓名: {{ scope.row.name }}</p>
                                                        <div slot="reference" class="name-wrapper">
                                                            <el-tag size="medium">{{ scope.row.name }}</el-tag>
                                                        </div>
                                                    </el-popover>
                                                </template>
                                            </el-table-column>
                                            <el-table-column label="科室权重" width="120">
                                                <template slot-scope="scope">
                                                    <i class="el-icon-time"></i>
                                                    <span style="margin-left: 10px">{{ scope.row.date }}</span>
                                                </template>
                                            </el-table-column>
                                            <el-table-column label="操作">
                                                <template slot-scope="scope">
                                                    <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                                                    <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                                                </template>
                                            </el-table-column>
                                        </el-table>
                                    </template>
                                </el-main>
                            </el-container>
                        </div>
                    </div>
                    <div class="themeText" v-show='navFault==6'>
                        <div class="inquiry_table tab_top">
                            <el-form :model="ruleInForm" :rules="rulesIn" ref="ruleInForm" label-width="100px" class="demo-ruleForm">
                                <el-form-item label="填写回答" prop="inquiry">
                                    <el-input v-model="ruleInForm.inquiry"></el-input>
                                </el-form-item>

                                <el-form-item>
                                    <el-button type="primary" @click="submitInForm('ruleInForm')" icon="el-icon-uploads">立即提交</el-button>
                                    <el-button @click="resetInForm('ruleInForm')" icon="el-icon-refresh" type="info" plain>重置</el-button>
                                </el-form-item>
                            </el-form>
                            <div class="qa_btn">
                                <p class="test_choice">请输入以下可选部位:</p>
                                <span class="qa_choise">头面部</span>
                                <span class="qa_choise">眼部</span>
                                <span class="qa_choise">耳部</span>
                                <span class="qa_choise">鼻部</span>
                                <span class="qa_choise">口腔</span>
                                <span class="qa_choise">颈部</span>
                                <span class="qa_choise">双上肢</span>
                                <span class="qa_choise">双手</span>
                                <span class="qa_choise">胸部</span>
                                <span class="qa_choise">腹部</span>
                                <span class="qa_choise">背部</span>
                                <span class="qa_choise">臀部及肛门部</span>
                                <span class="qa_choise">双下肢</span>
                                <span class="qa_choise">双足</span>
                                <span class="qa_choise">会阴部</span>
                                <span class="qa_choise">皮肤</span>
                                <span class="qa_choise">全身</span>
                            </div>
                        </div>
                    </div>
                    <div class="themeText" v-show='navFault==7'>
                        <div class="recode_table tab_top">
                            <el-form :model="ruleReForm" :rules="rulesRe" ref="ruleReForm" label-width="100px" class="demo-ruleForm">
                                <el-form-item label="填写回答" prop="recode">
                                    <el-input v-model="ruleReForm.recode"></el-input>
                                </el-form-item>

                                <el-form-item>
                                    <el-button type="primary" @click="submitReForm('ruleReForm')" icon="el-icon-uploads">立即提交</el-button>
                                    <el-button @click="resetReForm('ruleReForm')" icon="el-icon-refresh" type="info" plain>重置</el-button>
                                </el-form-item>
                            </el-form>
                        </div>
                    </div>
                    <div class="themeText" v-show='navFault==8'>
                        <div class="Con_table tab_top">
                            <el-form :model="ruleConForm" :rules="rulesCon" ref="ruleConForm" label-width="100px" class="demo-ruleForm">
                                <el-form-item label="填写回答" prop="Con">
                                    <el-input v-model="ruleReForm.Con"></el-input>
                                </el-form-item>

                                <el-form-item>
                                    <el-button type="primary" @click="submitConForm('ruleConForm')" icon="el-icon-uploads">立即提交</el-button>
                                    <el-button @click="resetConForm('ruleConForm')" icon="el-icon-refresh" type="info" plain>重置</el-button>
                                </el-form-item>
                            </el-form>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 侧导航菜单 -->
            <div class="nav_left">
                <div class="offOn">
                    <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;margin-top:15px;">
                        <el-radio-button :label="false">展开</el-radio-button>
                        <el-radio-button :label="true">收起</el-radio-button>
                    </el-radio-group>
                    <div id="load" v-loading="loading">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div>A</div>
                        <div>M</div>
                        <div>M</div>
                        <div>E</div>
                    </div>
                </div>
                <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
                    <el-submenu index="1">
                        <template slot="title">
                            <i class="el-icon-menu"></i>
                            <span slot="title">相关数据管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="1-1">
                                <div @click="navList(1)">部位管理</div>
                            </el-menu-item>
                            <el-menu-item index="1-2" @click="navList(2)">感觉/程度管理</el-menu-item>
                            <el-menu-item index="1-3" @click="navList(3)">病症管理</el-menu-item>
                            <el-menu-item index="1-4" @click="navList(4)">科室管理</el-menu-item>
                            <el-menu-item index="1-5" @click="navList(5)">问题组合权重修改</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-menu-item index="2" @click="navList(6)">
                        <i class="el-icon-view"></i>
                        <span slot="title">问诊测试</span>
                    </el-menu-item>
                    <el-menu-item index="3" @click="navList(7)">
                        <i class="el-icon-service"></i>
                        <span slot="title">测试录音返回</span>
                    </el-menu-item>
                    <el-menu-item index="4" @click="navList(8)">
                        <i class="el-icon-document"></i>
                        <span slot="title">添加对话</span>
                    </el-menu-item>
                </el-menu>
            </div>
        </nav>
        <!-- </div> -->
  </div>
</template>

<script>

export default {
  data() {
    return {
      navFault: 1, //导航点击切换
      fault: 1, //切换
      activeIndex: "1", //标题样式
      activeName: "second",
      isCollapse: true,
      loading: true, // loading
      // 0.0 表格状态
      tableRowClassName({ row, rowIndex }) {
        if (rowIndex === 1) {
          return "warning-row";
        } else if (rowIndex === 3) {
          return "success-row";
        }
        return "";
      },
      // 0.0 分页
      totalCount: 1000,
      totalCount2: 1000,
      totalCount3: 1000,
      totalCount4: 1000,
      currentPage: 1,
      pagesize: 10,
      pageindex:1,
      highlightId: -1, //默认高亮行数据id

      bodyId: 0,
      buId: 0,
      tableData: [
        {
          date: "1",
          name: "s",
          province: "上海",
          city: "普陀区"
        }
      ],
      // 1-33333333
      dialogIllFormVisible: false,
      dynamicValidateForm: {
        // domains: [
        //   {
        //     value: ""
        //   }
        // ],
        name: "",
        region: "",
        num: ""
      },
       dynamicValidateForm: {
          domains: [{
            value: ''
          }],
          name: '',
          number:1,
          text:'',
          qest:'',
        },
    
      // 添加
      dialogVisible: false,
      dialogBodyVisible: false, //1-1
      parent: {},
      tableData1: [
        {
          name: "",
          id: 0,
          pid: 0,
          code: "",
          value: ""
        }
      ],
      buwei:[],
      bodyRule: [
        {
          name: "",
          pname: "",
          code: "",
          pid: "",
          type: 1,
          value: ""
        }
      ],
      bodyAddform:{//部位管理添加
          name: '',
          region: '',
          delivery: false,
          type: [],
          code:'',
      },
       feelAddform:{//管理添加
          name: '',
          region: '',
          delivery: false,
          type: [],
          code:'',
      },
      Addrules:{//添加 验证规则
           name: [
            { required: true, message: '请输入部位名', trigger: 'blur' },
            { min: 1, max: 5, message: '长度在 1 到 5 个字符', trigger: 'blur' }
          ],
        //   code: [
        //     { required: true, message: '请输入代号', trigger: 'blur' },
        //     { min: 1, max: 5, message: '长度在 1 到 5 个字符', trigger: 'blur' }
        //   ],
        //   name: [
        //     { required: true, message: '请选择父类', trigger: 'change' }
        //   ],
        //  type: [
        //     { type: 'array', required: true, message: '请至少选择一个类型', trigger: 'change' }
        //   ],
      },
      bodyEdit:[],
      submitBodyForm(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      },
      dialogFixBodyVisible: false,
      dialogFeelVisible: false, //1-2
      tableData2: [{ name: "", id: 0, pid: 0 }],
      feelRule: {
        name: "",
        pname: "",
        pid: "",
        type: 1
      },
      offRule: {
        name: "",
        pname: "",
        pid: "",
        type: 1
      },
       feelAddform:{//部位管理添加
           name: '',
          region: '',
          delivery: false,
          type: [],
          code:'',
      },
      // 1-3 查看科室组合详情-嵌套弹窗
      tableData3: [{ name: "", id: 0, pid: 0 ,channelName:'',num:0,}],
      outerVisible: false,
      innerVisible: false,
      sear:[],
      dialogOfficeVisible: false, //1-4
      tableData4: [{name: "",id: 0,cid: 0,code: ""}
      ],
      dialogFixUpVisible: false, //1-4.3 修改按钮
      FixUpValidateForm: {
        // domains: [
        //   {
        //     value: ""
        //   }
        // ],
        keshiName: ""
      },
      // 1-4.4 添加组合
      addOnes: {
        ones: [
          {
            // value: ""
          }
        ]
      },
      ruleForm: {
        name: "",
        code: "",
        region: "",
        resource: ""
      },

      // 弹窗form-规则
      rules: {
        name: [
          { required: true, message: "请输入部位名称", trigger: "blur" },
          { min: 1, max: 5, message: "长度在 1 到 5 个字符", trigger: "blur" }
        ],
        code: [
          { required: true, message: "请须输入字母编号", trigger: "blur" },
          { min: 1, max: 10, message: "长度在 1 到 10 个字符", trigger: "blur" }
        ],
        region: [{ required: true, message: "请选择父类", trigger: "change" }],
        resource: [{ required: true, message: "请选择类型", trigger: "change" }]
      },
    
   
      // 1-5
      handleEdit(index, row) {
        console.log('--------',index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      },
      // 666666666
      ruleInForm: { inquiry: "" },
      rulesIn: {
        inquiry: [
          { required: true, message: "请输入名称", trigger: "blur" },
          { min: 1, max: 5, message: "长度在 1 到 5 个字符", trigger: "blur" }
        ]
      },
      // 77777777
      ruleReForm: { recode: "" },
      rulesRe: {
        recode: [
          { required: true, message: "请输入名称", trigger: "blur" },
          { min: 1, max: 5, message: "长度在 1 到 5 个字符", trigger: "blur" }
        ]
      },
      // 888888888
      ruleConForm: { Con: "" },
      rulesCon: {
        Con: [
          { required: true, message: "请输入名称", trigger: "blur" },
          { min: 1, max: 5, message: "长度在 1 到 5 个字符", trigger: "blur" }
        ]
      }
    };
  },
  mounted: function() {
    this.getParentList(); //1-1
    this.bodyList();
    this.feelList(); //1-2
    this.getfeelList();
    this.bingList();//1-3
    this.bingSea();
    this.OfficeList(); //1-4
    this.offName();
    this.quanList()// 1-5
  },
  methods: {
    feelList: function() {
      this.$http
        .post("http://192.168.0.116:8080/pro/feel/list")
        .then(
          function(res) {
            // console.log("feel/list的数据");
            this.tableData2 = res.data.list;
            this.totalCount2 = res.data.count;
          }.bind(this)
        )
        .catch(function(error) {
          console.log(error);
        });
    },
    feelDel: function(id, rows) {
      (this.feelId = id),
        this.$http
          .get("http://192.168.0.116:8080/pro/body/updatedel/" + this.feelId)
          .then(function(res) {
            console.log(res);
          })
          .catch(function(error) {
            console.log(error);
          });
      rows.splice(this.feelId, 1);
    },
    bingDel: function(id, rows) {
      (this.bingId = id),
        this.$http
          .get("http://192.168.0.116:8080/pro/symptom/delupdate/" + this.bingId)
          .then(function(res) {
            console.log(res);
          })
          .catch(function(error) {
            console.log(error);
          });
      rows.splice(this.bingId, 1);
    },
    OfficeList: function() {
      this.$http
        .post("http://192.168.0.116:8080/pro/channel/list")
        .then(
          function(res) {
            // console.log("channel/list的数据");
            this.tableData4 = res.data.list;
            this.totalCount4 = res.data.count;
          }.bind(this)
        )
        .catch(function(error) {
          console.log(error);
        });
    },
    officeDel:function(id,rows){
        (this.offId = id),
        this.$http.get("http://192.168.0.116:8080/pro/channel/delete/"+this.offId)
        .then(function(res) {
            console.log(res);
          })
          .catch(function(error) {
            console.log(error);
          });
      rows.splice(this.offId, 1);
    },
    feelEdit: function(index, row) {
      this.$http
        .post("http://192.168.0.116:8080/pro/body/edit", {})
        .then(function(res) {})
        .catch(function(error) {
          console.log(error);
        });
    },
    getfeelList: function() {
      this.$http
        .post("http://192.168.0.116:8080/pro/feel/getparentlist")
        .then(
          function(res) {
            // console.log("feel/getparentlist的数据");
            this.feelRule = res.data.list;
          }.bind(this)
        )
        .catch(function(error) {
          console.log(error);
        });
    },
    submitFeelForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // this.$http.post("http://192.168.0.116:8080/pro/feel/add",
          // {
          //     body:JSON.stringify({
          //         name:this.feelRule.name,
          //         pname:this.feelRule.pname,
          //         type:this.feelRule.type,
          //     })
          // })
          this.$http({
            url: "http://192.168.0.116:8080/pro/feel/add",
            method: "POST",
            body: JSON.stringify({
              name: this.feelRule.name,
              pname: this.feelRule.pname,
              type: this.feelRule.type
            })
          }).then(function(res) {
            console.log(res);
            // console.log(res.data.code);
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 1——1 0.0 分页
    handleSizeChange(val) {
      this.pagesize = val;
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      console.log(`当前页: ${val}`);
    },
    //1111111111111
    bodyList: function(pageSize) {
      this.$http
        .post("http://192.168.0.116:8080/pro/body/list")
        .then(
          function(res) {
            // console.log("body/list的数据");
            this.tableData1 = res.data.list;
            this.buwei = res.data.list;
            this.totalCount = res.data.count;
          }.bind(this)
        )
        .catch(function(error) {
          console.log(error);
        });
    },
    getParentList: function() {
      this.$http
        .get("http://192.168.0.116:8080/pro/body/getparentlist")
        .then(
          function(res) {
            // console.log("/body/getparentlist的数据");
            this.bodyRule = res.data.list;
            // console.log(this.bodyRule);
          }.bind(this)
        )
        .catch(function(error) {
          console.log(error);
        });
    },
    delBodyMsg: function(id, rows) {
      (this.bodyId = id), 
    //   var tableData = this.tableData1,
    //   console.log(this.bodyname);
      this.$http
        .get("http://192.168.0.116:8080/pro/body/updatedel/" + this.bodyId)
        .then(
          function(res) {
            console.log(res);
            // console.log("updatedel的数据");
            this.tableData1.splice(this.bodyId,1)
          }.bind(this)
        )
        .catch(function(error) {
          console.log(error);
        });
    //   rows.splice(this.bodyId, 1);

    },
    addBody: function() {
        this.tableData1.push({
            name:this.bodyAddform.name,
            // code:this.bodyAddform.code,
            code:ConvertPinyin(this.bodyAddform.name),
            bodyRule:this.bodyAddform.bodyRule,
            type:this.bodyAddform.type,
        })
      this.$http
        .post("http://192.168.0.116:8080/pro/body/add/")
        // name:this.bodyRule.name
        // code:this.bodyRule.code
        // pname:this.bodyRulepname
        // type:this.bodyRule.type
        .then(
          function(res) {
            console.log("addbody的数据");
            var bodyAdd = res;
            console.log(bodyAdd);
          }.bind(this)
        )
        .catch(function(error) {
          console.log(error);
        });
    },
    // handleClick(row) {
    //     console.log(row);
    //     name:this.tableData1.name,
    //     console.log('name--',name)
    // },
    editBodyMsg: function(id,row) {
      this.dialogFixBodyVisible = true;
      console.log(row),
      this.$http({
          url:"http://192.168.0.116:8080/pro/body/edit",
          method:"post",
          bodyAddform:{
              name:this.bodyAddform.name,
              code:this.bodyAddform.code,
          }
      })
        .then(
          function(res) {
            console.log("body/edit的数据");
            this.bodyEdit = res;
            // console.log(this.bodyEdit);
          }.bind(this)
        )
        .catch(function(error) {
          console.log(error);
        });
    },
    //类型显示转换
    formatSex: function(row, column) {
      return row.sex == 0 ? "身体部位" : row.sex == 1 ? "分泌物" : "其他";
      console.log(row,co)
    },
    // 1-2
    formatter(row, column) {
      //   return row.address;
    },
    //    1-333333 tanchaung-add
     //   --------------------------------------------------------
      submitForm(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            alert("submit!");
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      },
     //  弹窗 重置 
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      removeDomain(item) {
        var index = this.dynamicValidateForm.domains.indexOf(item)
        if (index !== -1) {
          this.dynamicValidateForm.domains.splice(index, 1)
        }
      },
      addDomain() {
        this.dynamicValidateForm.domains.push({
          value: '',
          key: Date.now()
        });
      },
    // submitAddForm(formName) {
    //   this.$refs[formName].validate(valid => {
    //     if (valid) {
    //       alert("submit!");
    //     } else {
    //       console.log("error submit!!");
    //       return false;
    //     }
    //   });
    // },
    // resetAddForm(formName) {
    //   this.$refs[formName].resetFields();
    // },
    // removeAddDomain(item) {
    //   var index = this.dynamicValidateForm.domains.indexOf(item);
    //   if (index !== -1) {
    //     this.dynamicValidateForm.domains.splice(index, 1);
    //   }
    // },
    // addAddDomain() {
    //   this.dynamicValidateForm.domains.push({
    //     value: "",
    //     key: Date.now()
    //   });
    // },
     bingList: function(pagesize,pageindex) {
        this.$http({
            url:"http://192.168.0.116:8080/pro/symptom/list",
            method:"post",
            params:{
                pageSize:this.pagesize,
                pageIndex:this.pageindex,
            }
        })
        .then(
          function(res) {
            console.log("bing/list的数据");
            console.log(res)
            this.tableData3 = res.data.list;
            console.log(this.tableData3)
            this.totalCount3 = res.data.count;
          }.bind(this)
        )
        .catch(function(error) {
          console.log(error);
        });
    },
    offName: function() {
        this.$http({
            url:"http://192.168.0.116:8080/pro/channel/getallchannels",
            method:"post",
        })
        .then(
          function(res) {
            console.log("off/name的数据");
            console.log(res.data.list)
            this.offRule = res.data.list;
          }.bind(this)
        )
        .catch(function(error) {
          console.log(error);
        });
    },
    bingSea: function(pagesize,pageindex) {
        this.$http({
            url:"http://192.168.0.116:8080/pro/symptom/search",
            method:"post",
            // params:{
            //     pageSize:this.pagesize,
            //     pageIndex:this.pageindex,
            // }
        })
        .then(
          function(res) {
            console.log("bing/search的数据");
            console.log(res)
            this.sear = res;
            // console.log(this.sear)
            this.totalCount3 = res.data.count;
          }.bind(this)
        )
        .catch(function(error) {
          console.log(error);
        });
    },
    // 1-4.3 修改按钮弹窗内容
    submitFixUpForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    resetFixUpForm(formName) {
      this.$refs[formName].resetFields();
    },
    removeFixUpDomain(item) {
      var index = this.FixUpValidateForm.domains.indexOf(item);
      if (index !== -1) {
        this.FixUpValidateForm.domains.splice(index, 1);
      }
    },
    addFixUpDomain() {
      this.FixUpValidateForm.domains.push({
        value: "",
        key: Date.now()
      });
    },
    // 1-4.4按钮弹窗内容
    submitOneForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetOneForm(formName) {
      this.$refs[formName].resetFields();
    },
    removeOneDomain(item) {
      var index = this.addOnes.ones.indexOf(item);
      if (index !== -1) {
        this.addOnes.ones.splice(index, 1);
      }
    },
    addOneDomain() {
      this.addOnes.ones.push({
        value: "",
        key: Date.now()
      });
    },
    // 1-5
     quanList: function(id,rows) {
        //  this.delBodyMsg(),
        // (this.buId = id), 
        // console.log(this.bodyId)
        //  $("div.father a>p:first").css("background-color","#f7c478");//部位第一个样式
         
        console.log(rows)
    //   this.$http
    //     .post("http://192.168.0.116:8080/pro/question/getfeels/"+this.buId)
    //     .then(
    //       function(res) {
    //         console.log("quan/list的数据");
    //         console.log(res)
    //       }.bind(this)
    //     )
    //     .catch(function(error) {
    //       console.log(error);
    //     });
    },

    // 6666666
    submitInForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetInForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 77777777
    submitReForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetReForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 88888888
    submitConForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetConForm(formName) {
      this.$refs[formName].resetFields();
    },

    // 添加弹窗内容 提交事件
    onSubmit() {
      console.log("submit!");
    },
    // 添加弹窗 X-取消开关
    addClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    // 导航列表
    navList(i) {
      this.navFault = i;
    },
    // right-导航 trigger切换事件
    tit(ii) {
      this.fault = ii;
    },
    // 查看row
    handleClick(tab, row) {
      this.highlightId = tab.id;
      console.log(tab, row);
    },

    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },

    // 侧导是否展开
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  },

  created() {}
};
</script>


<style scoped>

</style>
