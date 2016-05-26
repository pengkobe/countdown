import React, { Component, PropTypes } from 'react';
/// 组件列表
import { Form,  Col, DatePicker, Input, Select, Radio, Slider } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
import styles from './AddCountdown.less';

class AddCountdownContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // 倒计时列表
            value:3,
            loading: false,
        };
    }
    componentDidMount() { }

    handleSelectChange() { }

    render() {
        const { location } = this.props;
        const { loading } = this.state;
        //const { getFieldProps } = this.props.form;//{...getFieldProps('slider') } validateStatus="error" help="请选择正确日期"
        return (
            <Form horizontal form={this.props.form}>
                <FormItem
                    id="control-input"
                    label="名称："
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 16 }}>
                    <Input id="control-input" placeholder="计时器名称..." />
                </FormItem>
                <FormItem
                    id="control-textarea"
                    label="描述："
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 16 }}>
                    <Input type="textarea" id="control-textarea" rows="3" />
                </FormItem>
                <FormItem
                    id="control-input"
                    label="循环："
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 16 }}>
                    <RadioGroup onChange={this.onChange} value={this.state.value}>
                        <Radio key="a" value={1}>每周</Radio>
                        <Radio key="b" value={2}>每月</Radio>
                        <Radio key="c" value={3}>每年</Radio>
                        <Radio key="d" value={4}>一次</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem
                    id="select"
                    label="类型："
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 16 }}>
                    <Select id="select" size="large" defaultValue="计划" style={{ width: 200 }} onChange={this.handleSelectChange}>
                        <Option value="生日">生日</Option>
                        <Option value="计划">计划</Option>
                        <Option value="时间节点">时间节点</Option>
                        <Option value="disabled" disabled>其它</Option>
                    </Select>
                </FormItem>
                <FormItem
                    label="时间："
                    labelCol={{ span: 4 }}
                    help>
                    <Col span="7">
                        <FormItem  >
                            <DatePicker />
                        </FormItem>
                    </Col>
                    <Col span="1">
                        <p className="ant-form-split">-</p>
                    </Col>
                    <Col span="7">
                        <FormItem>
                            <DatePicker />
                        </FormItem>
                    </Col>
                </FormItem>
                
                <FormItem
                    label="级别："
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 16 }}
                    required>
                    <Slider marks={['A', 'B', 'C', 'D', 'E', 'F', 'G']}  />
                </FormItem>
            </Form>
        );
    }
}

export default AddCountdownContainer;
