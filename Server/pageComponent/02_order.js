import { Form, Icon, Input, Button, Checkbox } from 'antd';
import React, { useState } from 'react';
// import Cal from '../component/04_calculator'
const Order = (props) => {

  let [ROI, setROI] = useState(0);

  const cssBlockROI = () => {
    if (ROI == 0) return "gray";
    else if (ROI > 0) return "green";
    else if (ROI < 0) return "red";
    else return "undefine";
  }

  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        setROI(values.test);
      }
    });
  };

  const { getFieldDecorator } = props.form;
  return (
    <>
    {/* <Cal/> */}
      <div id="Status-Block">
        <p id="ROIPercent">{ROI} %</p>
      </div>
      <Form onSubmit={handleSubmit} className="login-form">

        <Form.Item>
          <p>Buy grid size (%)</p>
          {getFieldDecorator('gridSize', {
            rules: [{ required: true, message: 'Grid size (%)' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Grid size %"
            />,
          )}
        </Form.Item>

        <Form.Item>
          <p>Take profit (%)</p>
          {getFieldDecorator('takeProfit', {
            rules: [{ required: true, message: 'Take profit (%)' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Take profit (%)"
            />,
          )}
        </Form.Item>

        <div id="Trailing-container">
          <Form.Item>
            {getFieldDecorator('useTrailing', {
              valuePropName: 'checked',
              initialValue: false,
            })(<Checkbox>Use Trailing Start, Trailing Stop</Checkbox>)}
          </Form.Item>

          <Form.Item>
            <p>Trailing Start</p>
            {getFieldDecorator('TrailingStart', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="% Trailing Start"
              />,
            )}
          </Form.Item>

          <Form.Item>
            <p>Trailing Stop</p>
            {getFieldDecorator('TrailingStop', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="% Trailing Stop"
              />,
            )}
          </Form.Item>
        </div>

        <div id="cutLoss-container">
          <Form.Item>
            {getFieldDecorator('Cut loss (%)', {
              valuePropName: 'checked',
              initialValue: false,
            })(<Checkbox>Use cutloss</Checkbox>)}
          </Form.Item>
          <Form.Item>
            <p>Cut loss (%)</p>
            {getFieldDecorator('TrailingStop (%)', {
              rules: [{ required: true, message: 'Input your cutloss (%)' }],
            })(
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="% Trailing Stop (%)"
              />,
            )}

            <Button type="primary" htmlType="submit" className="login-form-button">
              Save
          </Button>
          </Form.Item>
        </div>
      </Form>

      <style jsx={true}>{`
          #Status-Block {
            width: 300px;
            height: 300px;
            background-color: ${cssBlockROI()};
          }
          #ROIPercent {
            font-size: 20px;
            margin-left: 50%;
            padding-top: 50%;
          }
          #Trailing-container {

          }
          #cutLoss-container {

          }
    `}
      </style>
    </>
  );
}

const WrappedNormalLoginForm = Form.create({ name: 'trade' })(Order);

export default WrappedNormalLoginForm