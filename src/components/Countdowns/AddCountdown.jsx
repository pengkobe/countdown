import React, { Component, PropTypes } from 'react';
import { Form, Col, DatePicker, Button, Input, Modal, Select, Radio, Checkbox, Slider } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
import styles from './AddCountdown.less';
import { addCountdown } from '../../services/Countdowns';

class AddCountdownContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
    }
    handleCancel() {
        this.setState({ visible: false });
    }
    componentDidMount() { }
    handleSubmit(e) {
        e.preventDefault();
        let formValues = this.props.form.getFieldsValue();
        console.log('收到表单值：', formValues);
        let data = JSON.stringify(formValues);
        let addData = JSON.parse(data);
        addCountdown(data).then(({ jsonResult }) => {
            this.props.onAdd(jsonResult.data);
            this.setState({
                loading: false,
                visible: false,
            });
            this.props.form.resetFields();
        });
    }

    render() {
        const { location } = this.props;
        const { loading } = this.state;
        const { getFieldProps } = this.props.form;
        const typeSelectProps = getFieldProps('type', {
            rules: [],
        });
        return (
            <div className={styles.addWrap}>
                <Button type="primary" icon="plus" onClick={this.showModal.bind(this) }>
                    添加计时器
                </Button>
                <Modal ref="modal"
                    visible={this.state.visible}
                    title="添加计时器"
                    onOk={this.handleSubmit.bind(this) }
                    onCancel={this.handleCancel.bind(this) }
                    footer={[
                        <Button key="back" type="ghost" size="large"
                            onClick={this.handleCancel.bind(this) }>取消</Button>,
                        <Button key="submit" type="primary" size="large"
                            loading={this.state.loading}
                            onClick={this.handleSubmit.bind(this) }>
                            提 交
                        </Button>
                    ]}>
                    <Form horizontal form={this.props.form}>
                        <FormItem
                            id="control-input"
                            label="名称："
                            labelCol={{ span: 4 }}
                            wrapperCol={{ span: 16 }}
                            required>
                            <Input id="control-input" {...getFieldProps('event') } placeholder="计时器名称..." />
                        </FormItem>
                        <FormItem
                            id="control-textarea"
                            label="描述："
                            labelCol={{ span: 4 }}
                            wrapperCol={{ span: 16 }}
                            required>
                            <Input type="textarea" id="control-textarea" {...getFieldProps('detail') }  rows="3" />
                        </FormItem>
                        <FormItem
                            label="时间："
                            labelCol={{ span: 4 }} required
                            help>
                            <Col span="12">
                                <FormItem>
                                    <DatePicker {...getFieldProps('endtime') }/>
                                </FormItem>
                            </Col>
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
                            label="级别："
                            labelCol={{ span: 4 }}
                            wrapperCol={{ span: 16 }}>
                            <Slider  {...getFieldProps('level') } marks={['A', 'B', 'C', 'D', 'E', 'F']}  />
                        </FormItem>
                        <FormItem
                            label="私有："
                            labelCol={{ span: 4 }}
                            wrapperCol={{ span: 16 }}>
                            <Checkbox {...getFieldProps('isPrivate') }></Checkbox>
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        );
    }
}

// backup
// <Col span="7">
//     <FormItem  >
//         <DatePicker  {...getFieldProps('begintime') }/>
//     </FormItem>
// </Col>
// <Col span="1">
//     <p className="ant-form-split">-</p>
//  </Col>

AddCountdownContainer = Form.create()(AddCountdownContainer);
export default AddCountdownContainer;
