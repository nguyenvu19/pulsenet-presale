import { Button, Checkbox, Col, DatePicker, Form, Input, Row, Table, Space, Select } from 'antd'
import type { CheckboxChangeEvent } from 'antd/es/checkbox'

import React, { useMemo, useState } from 'react'

import { formatDate } from 'helpers'
import { formatCode } from 'helpers/CommonHelper'

import { useRouter } from 'next/router'
import styled from 'styled-components'

import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { getBlockExploreLink } from 'utils'
import { useClaimBuyPackages } from '../hook/useHistoryBuyPackages'

const { RangePicker } = DatePicker

const WAdminHomePage = styled.div`
  width: 100%;
  padding: 20px;
  background-color: rgb(255, 255, 255);
  border: 1px solid rgb(233, 233, 233);
  height: 100%;
  margin-top: 10px;

  ${({ theme }) => theme.mediaQueries.sm} {
    padding: 35px;
  }

  .zodi-control-page {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 32px;

    ${({ theme }) => theme.mediaQueries.md} {
      align-items: flex-end;
      flex-direction: row;
    }

    h1 {
      font-size: 50px;
      font-weight: 500;
      margin-bottom: 20px;
      color: #000;

      ${({ theme }) => theme.mediaQueries.md} {
        margin-bottom: 0;
      }
    }

    a {
      border-color: rgb(24, 144, 255);
      background: rgb(24, 144, 255);
      text-shadow: rgb(0 0 0 / 12%) 0px -1px 0px;
      box-shadow: rgb(0 0 0 / 4%) 0px 2px;
      color: rgb(255, 255, 255) !important;
      padding: 8px 20px;
      min-height: 38px;
      max-height: 38px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: none;
      box-shadow: rgb(0 0 0 / 35%) 0px 5px 15px;
      cursor: pointer;
    }
  }

  .anticon {
    margin: 0;
  }

  .ant-form {
    .ant-row {
      .ant-col {
        margin: 0;

        ${({ theme }) => theme.mediaQueries.sm} {
          margin-left: 16.66666667%;
        }
      }

      .ant-form-item-label {
        min-width: 110px;
        margin-left: 0;
        text-align: left;

        .ant-form-item-required {
          justify-content: flex-start;
        }
      }
    }
  }

  .history-content {
    .history-content-head {
      display: flex;
      flex-direction: column;
      margin-bottom: 10px;

      ${({ theme }) => theme.mediaQueries.md} {
        flex-direction: row;
        align-items: center;
      }

      .ant-checkbox-wrapper {
        margin: 0 0 10px 0;

        ${({ theme }) => theme.mediaQueries.md} {
          margin: 0 10px 5px 0;
        }
      }

      .ant-form-item {
        margin: 0;
      }
    }

    .history-content-middle {
      margin-bottom: 10px;

      .ant-row {
        margin-bottom: 8px;

        .ant-col {
          ${({ theme }) => theme.mediaQueries.sm} {
            margin: 0 !important;
          }
        }
      }

      .ant-checkbox-wrapper {
        margin: 0 0 10px 0;

        ${({ theme }) => theme.mediaQueries.md} {
          margin: 0 10px 5px 0;
        }
      }

      .ant-form-item {
        margin: 0;
      }
    }
  }
`

const AdminHomePage: React.FC = () => {
  const [chainId, setChainId] = useState()

  const [search, setSearch] = useState({})

  const [form] = Form.useForm()
  const router = useRouter()

  const column = [
    {
      title: 'Package ID',
      dataIndex: 'packageId',
    },
    {
      title: 'ID',
      dataIndex: 'id',
      render: (data) => {
        return formatCode(data, 5, 5)
      },
    },

    {
      title: 'Amount Buy',
      dataIndex: 'amountBuy',
      render: (record) => {
        return (record / 1e18).toLocaleString()
      },
    },

    {
      title: 'Amount Token',
      dataIndex: 'amountToken',
    },

    {
      title: 'Create Time',
      dataIndex: 'createdTime',
      render: (record) => {
        return (
          <div>
            <p>{formatDate(record * 1000, 'yyyy-MM-DD')}</p>
          </div>
        )
      },
    },

    {
      title: 'TxH',
      dataIndex: 'transactionHash',
      render: (data) => {
        return (
          <a href={getBlockExploreLink(data, 'transaction', chainId)} target="_blank" rel="noreferrer">
            {formatCode(data, 5, 5)}
          </a>
        )
      },
    },

    {
      title: 'User Address',
      dataIndex: 'userAddress',
      render: (data) => {
        return (
          <a href={getBlockExploreLink(data, 'address', chainId)} target="_blank" rel="noreferrer">
            {formatCode(data, 5, 5)}
          </a>
        )
      },
    },

    // {
    //   title: 'Transaction Hash',
    //   dataIndex: 'transactionHash',
    // render: (data) => {
    //   return (
    //     <a href={getBlockExploreLink(data, 'transaction', chainId)} target="_blank" rel="noreferrer">
    //       {formatCode(data, 5, 5)}
    //     </a>
    //   )
    // },
    // },

    // {
    //   title: 'Create time',
    //   dataIndex: 'createdTime',
    // render: (record) => {
    //   return (
    //     <div>
    //       <p>{formatDate(record * 1000, 'yyyy-MM-DD')}</p>
    //     </div>
    //   )
    // },
    // },
  ]

  // Get data from deposit history with graph
  const { buyPackages } = useClaimBuyPackages(search, chainId)
  const dataBuyPackages = buyPackages.dataReport

  // const depositHistoriesClone: any[] = useMemo(
  //   () =>
  //     depositHistories
  //       ?.map((campaign) => ({
  //         ...campaign,
  //         amount: (Number(campaign.amount) / 1e18).toLocaleString(),
  //       }))
  //       .filter((item: any) => {
  //         if (searchAddress !== '') {
  //           return item.userAddress.includes(searchAddress)
  //         }

  //         if (searchPlan !== '') {
  //           return String(item.planId).includes(searchPlan)
  //         }

  //         if (searchTxH !== '') {
  //           return item.transactionHash.includes(searchTxH)
  //         }

  //         return item
  //       }),

  //   [depositHistories, searchAddress, searchPlan, searchTxH],
  // )

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase()
    setSearch({ ...search, [e.target.name]: value })
  }

  const handleSelectChain = (value) => {
    setChainId(value)
  }

  return (
    <WAdminHomePage>
      <div className="zodi-control-page">
        <h1>Sale Report</h1>
        <Button type="primary" size="large" onClick={() => router.back()}>
          Back
        </Button>
      </div>

      <div className="history-content">
        <div className="history-content-head">
          <Select
            showSearch
            placeholder="Select Chain"
            optionFilterProp="children"
            onChange={handleSelectChain}
            filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
            options={[
              {
                value: '1',
                label: 'ETH',
              },
              {
                value: '56',
                label: 'BSC',
              },
            ]}
          />
        </div>

        <div className="history-content-middle">
          <Form form={form}>
            <Row gutter={8}>
              <Col span={8}>
                <Form.Item label="Package ID">
                  <Input
                    size="middle"
                    autoComplete="true"
                    name="packageId"
                    onChange={handleSearch}
                    placeholder="Package ID"
                  />
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item label="User Address">
                  <Input
                    size="middle"
                    autoComplete="true"
                    name="userAddress"
                    onChange={handleSearch}
                    placeholder="User Address"
                  />
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item label="TxH">
                  <Input
                    size="middle"
                    autoComplete="true"
                    name="txh"
                    onChange={handleSearch}
                    placeholder="Transaction hash"
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
        <div className="history-content-middle">
          <Table columns={column} dataSource={dataBuyPackages} scroll={{ x: 1200 }} />
        </div>

        {/* <div className="history-content-middle">
          {selected === 'Deposit' ? (
            <Table
              columns={columnsDeposit}
              // dataSource={dateRange && dateRange[0] ? depositHistoriesByDateClone : depositHistoriesClone}
              scroll={{ x: 1200 }}
            />
          ) : (
            // <Table columns={columnsWithdraw} dataSource={withdrawHistoriesClone} scroll={{ x: 1000 }} />
          )}
        </div> */}
      </div>
    </WAdminHomePage>
  )
}

export default AdminHomePage
