import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';


class MemberList extends Component {

    constructor(props) {
        super(props);
        this.state = {list:[], isLoading: true};
        this.remove = this.remove.bind(this);
    }

    componentDidMount(){
        this.setState({isLoading:true});
        fetch('/api/member')
            .then(response => response.json())
            .then(data => this.setState({list:data.data, isLoading:false}));
    }

    async remove(id){
        await fetch('/api/member/${id}', {
           method: 'DELETE'
           , headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedMember = [...this.state.list].filter(i => i.memNo !== id);
            this.setState({list:updatedMember});
        });
    }

    render() {
        const {list, isLoading} = this.state;

        if (isLoading) {
            return <p>Loading...</p>;
        }

        const memberList = list.map(data => {
            const address = `${data.address || ''}`;
            return <tr key={data.memNo}>
                <td>{data.id}</td>
                <td style={{whiteSpace: 'nowrap'}}>{data.name}</td>
                <td>{data.email}</td>
                <td>{address}</td>
                <td>{data.age}</td>
                <td>
                    <ButtonGroup>
                        <Button size="sm" color="primary" tag={Link} to={"/members/" + data.memNo}>Edit</Button>
                        <Button size="sm" color="danger" onClick={() => this.remove(data.memNo)}>Delete</Button>
                    </ButtonGroup>
                </td>
            </tr>
        });

        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                    <div className="float-right">
                        <Button color="success" tag={Link} to="/members/new">Add Member</Button>
                    </div>
                    <h3>Member</h3>
                    <Table className="mt-4">
                        <thead>
                        <tr>
                            <th width="20%">Id</th>
                            <th width="20%">Name</th>
                            <th width="20%">Email</th>
                            <th width="20%">Address</th>
                            <th width="20%">Age</th>
                            <th width="20%"></th>
                        </tr>
                        </thead>
                        <tbody>
                        {memberList}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}
export default MemberList;