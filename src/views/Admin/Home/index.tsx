import { Button, Checkbox, Col, DatePicker, Form, Input, Row, Table, Space, Select } from 'antd'
import type { CheckboxChangeEvent } from 'antd/es/checkbox'
import { Link } from '@pancakeswap/uikit'

import React, { useMemo, useState } from 'react'
import { useRouter } from 'next/router'

import styled from 'styled-components'

import { formatDate } from 'helpers'
import { formatCode } from 'helpers/CommonHelper'
import { ChainId } from '@pancakeswap/sdk'

import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { getBlockExploreLink, toLocaleString } from 'utils'
import { APP_ENV } from 'config'
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
      title: 'User Address',
      dataIndex: 'userAddress',
      render: (data) => {
        return (
          <Link external href={getBlockExploreLink(data, 'address', chainId)} target="_blank" rel="noreferrer">
            {formatCode(data, 5, 5)}
          </Link>
        )
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
      title: 'TxH',
      dataIndex: 'transactionHash',
      render: (data) => {
        return (
          <Link href={getBlockExploreLink(data, 'transaction', chainId)} target="_blank" rel="noreferrer">
            {formatCode(data, 5, 5)}
          </Link>
        )
      },
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
  ]

  // Get data from buyPackages with graph
  const { buyPackages } = useClaimBuyPackages(search, chainId)
  const dataBuyPackages = buyPackages.dataReport

  const dataBuyPackagesClone: any[] = useMemo(
    () =>
      dataBuyPackages
        ?.map((campaign) => ({
          ...campaign,
          amountToken: Number(campaign.amountToken).toLocaleString(),
        }))
        .sort((a, b) => Number(a.packageId) - Number(b.packageId)),
    [dataBuyPackages],
  )

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
        <div className="history-content-middle">
          <Form form={form} layout="vertical">
            <Row gutter={[8, 8]}>
              <Col span={6}>
                <Form.Item label="Chain">
                  <Select
                    showSearch
                    placeholder="Select Chain"
                    optionFilterProp="children"
                    onChange={handleSelectChain}
                    filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                    options={
                      APP_ENV === 'development'
                        ? [
                            {
                              // dev =5
                              value: ChainId.GOERLI,
                              label: 'ETH',
                            },
                            {
                              // dev = 97
                              value: ChainId.BSC_TESTNET,
                              label: 'BSC',
                            },
                          ]
                        : [
                            {
                              value: ChainId.ETHEREUM,
                              label: 'ETH',
                            },
                            {
                              value: ChainId.BSC,
                              label: 'BSC',
                            },
                          ]
                    }
                  />
                </Form.Item>
              </Col>

              <Col span={6}>
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

              <Col span={6}>
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

              <Col span={6}>
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

        <div className="history-content-bottom">
          <Table columns={column} dataSource={dataBuyPackagesClone} scroll={{ x: 1200 }} />
        </div>
      </div>
    </WAdminHomePage>
  )
}

export default AdminHomePage
