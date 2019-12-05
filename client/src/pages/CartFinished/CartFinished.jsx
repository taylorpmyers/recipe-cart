import React, { Component } from 'react';
import { Grid, Row, Col, Table } from 'react-bootstrap'
class CartFinished extends Component {
    render() {
        return (
            <Grid style={{ paddingTop: "60px" }}>
                <Row>
                    <Col style={{ paddingBottom: "100px" }} children=
                        {Object.keys(this.props.groceryList).map((key, index) =>
                            <div key={key}>
                                <Table striped style={{ border: "1px #ddd solid", margin: "5% auto 0px", maxWidth: "600px" }}>
                                    <thead>
                                        <tr>
                                            <td style={{ border: "1px #d9d9d9 solid" }} >Amount</td>
                                            <td style={{ border: "1px #d9d9d9 solid" }} >Item</td>
                                        </tr>
                                    </thead>
                                    <tbody className="groceryListTbody" children={
                                        this.props.groceryList[key].map((groceryItem, index) => (
                                            <tr key={groceryItem.name}>
                                                <td style={{ border: "1px #d9d9d9 solid" }} >
                                                    <p className="cartListP" style={{ display: "inline-block", marginTop: "10px", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis", width: 25 }}>{groceryItem.cartTotal}</p>
                                                </td>
                                                <td style={{ border: "1px #d9d9d9 solid" }} className="groceryListCart">
                                                    <p className="cartListP" style={{ display: "inline-block", marginTop: "10px", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis", width: 150 }}>{groceryItem.name}</p>
                                                </td>

                                            </tr>
                                        ))} />
                                </Table>
                            </div>)} />
                </Row>
            </Grid>
        )
    }
}

export default CartFinished;