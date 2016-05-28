import React, { Component, PropTypes } from 'react';
/// 组件列表
import { Form, Col, DatePicker, Button, Input, Modal, Select, Radio, Slider } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
import styles from './AddCountdown.less';
import { addCountdown } from '../../services/Countdowns';

class AddCountdownContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // 倒计时列表
            loading: false,
            visible: false,
        };
    }
    showModal() {
        this.setState({
            visible: true,
        });
    }
    handleOk() {
        this.setState({ loading: true });
        setTimeout(() => {
            this.setState({ loading: false, visible: false });
        }, 3000);
        // 在这里修改AddCountdown状态
    }
    handleCancel() {
        this.setState({ visible: false });
    }
    componentDidMount() { }

    handleSubmit(e) {
        e.preventDefault();
        var formValues = this.props.form.getFieldsValue();
        console.log('收到表单值：', formValues);
        // this.setState({
        //         loading: true,
        // });
        // var data = new FormData()
        // data.append('begintime', formValues.begintime);
        // data.append('endtime', formValues.endtime);
        // data.append('event', formValues.event);
        // data.append('detail', formValues.detail);
        // data.append('type', formValues.type);
        // data.append('level', formValues.level);
        // data.append('cycle', formValues.cycle);
        var data = JSON.stringify(formValues);
        addCountdown(data).then(({ jsonResult }) => {
            this.setState({
                loading: false,
            });
        });
    }

    render() {
        const { location } = this.props;
        const { loading } = this.state;
        const { getFieldProps } = this.props.form;//{...getFieldProps('slider') } validateStatus="error" help="请选择正确日期"
        const typeSelectProps = getFieldProps('type', {
            rules: [
                { required: true, message: '计时器类型未填' },
            ],
        });
        return (
            <div>
                <Button type="primary" onClick={this.showModal.bind(this) }>
                    添加计时器
                </Button>
                <Modal ref="modal"
                    visible={this.state.visible}
                    title="添加计时器" onOk={this.handleSubmit.bind(this) } onCancel={this.handleCancel.bind(this) }
                    footer={[
                        <Button key="back" type="ghost" size="large" onClick={this.handleCancel.bind(this) }>取消</Button>,
                        <Button key="submit" type="primary" size="large" loading={this.state.loading} onClick={this.handleSubmit.bind(this) }>
                            提 交
                        </Button>,
                    ]}>
                    <Form horizontal form={this.props.form}>
                        <FormItem
                            id="control-input"
                            label="名称："
                            labelCol={{ span: 4 }}
                            wrapperCol={{ span: 16 }}>
                            <Input id="control-input" {...getFieldProps('event') } placeholder="计时器名称..." />
                        </FormItem>
                        <FormItem
                            id="control-textarea"
                            label="描述："
                            labelCol={{ span: 4 }}
                            wrapperCol={{ span: 16 }}>
                            <Input type="textarea" id="control-textarea" {...getFieldProps('detail') }  rows="3" />
                        </FormItem>
                        <FormItem
                            id="control-input"
                            label="循环："
                            labelCol={{ span: 4 }}
                            wrapperCol={{ span: 16 }}>
                            <RadioGroup defaultValue="一次" {...getFieldProps('cycle') } >
                                <Radio key="d" value="一次">一次</Radio>
                                <Radio key="a" value="周">每周</Radio>
                                <Radio key="b" value="月">每月</Radio>
                                <Radio key="c" value="年">每年</Radio>
                            </RadioGroup>
                        </FormItem>
                        <FormItem
                            id="select"
                            label="类型："
                            labelCol={{ span: 4 }}
                            wrapperCol={{ span: 16 }}>
                            <Select id="select" size="large" {...typeSelectProps}
                                defaultValue="计划"  >
                                <Option value="计划">计划</Option>
                                <Option value="生日">生日</Option>
                                <Option value="节点">节点</Option>
                                <Option value="其它">其它</Option>
                            </Select>
                        </FormItem>
                        <FormItem
                            label="时间："
                            labelCol={{ span: 4 }}
                            help>
                            <Col span="7">
                                <FormItem  >
                                    <DatePicker  {...getFieldProps('begintime') }/>
                                </FormItem>
                            </Col>
                            <Col span="1">
                                <p className="ant-form-split">-</p>
                            </Col>
                            <Col span="7">
                                <FormItem>
                                    <DatePicker {...getFieldProps('endtime') }/>
                                </FormItem>
                            </Col>
                        </FormItem>
                        <FormItem
                            label="级别："
                            labelCol={{ span: 4 }}
                            wrapperCol={{ span: 16 }}
                            required>
                            <Slider  {...getFieldProps('level') } marks={['A', 'B', 'C', 'D', 'E', 'F', 'G']}  />
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        );
    }
}
AddCountdownContainer = Form.create()(AddCountdownContainer);
export default AddCountdownContainer;
