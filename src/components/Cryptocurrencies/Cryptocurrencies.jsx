import React, { useEffect, useState } from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import { Card, Row, Col, Input, Statistic } from "antd";
import { useGetCryptosQuery } from "../../services/cryptoApi";
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  FileSearchOutlined,
} from "@ant-design/icons";
import Spinner from "../Spinner";

const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState(cryptosList?.data?.coins);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const filteredData = cryptosList?.data?.coins.filter((coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setCryptos(filteredData);
  }, [cryptosList, searchTerm]);

  if (isFetching) return <Spinner />;
  return (
    <>
      {!simplified && (
        <div className="search-crypto">
          <Input
            prefix={
              <FileSearchOutlined style={{ color: "#ccc", fontSize: "19px" }} />
            }
            placeholder="Search Cryptocurrencies..."
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          />
        </div>
      )}
      <Row gutter={[32, 32]}>
        {cryptos?.map((currency) => (
          <Col xs={12} sm={12} lg={6} className="crypto-card" key={currency.id}>
            <Link to={`/crypto/${currency.uuid}`}>
              <Card
                title={`${currency.rank}. ${currency.name}`}
                extra={<img className="crypto-image" src={currency.iconUrl} />}
                hoverable
              >
                <p>Price: {millify(currency.price)}</p>
                <p>Market Cap: {millify(currency.marketCap)}</p>
                <Statistic
                  title="Daily Change"
                  value={millify(currency.change)}
                  precision={2}
                  valueStyle={
                    millify(currency.change) > 0
                      ? { color: "#3f8600" }
                      : { color: "#cf1322" }
                  }
                  prefix={
                    millify(currency.change) > 0 ? (
                      <ArrowUpOutlined />
                    ) : (
                      <ArrowDownOutlined />
                    )
                  }
                  suffix="%"
                />
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Cryptocurrencies;
