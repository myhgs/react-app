import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';

class MemberEdit extends Component {

    emptyMember = {
        memNo: '',
        id: '',
        name: '',
        email: '',
        address: '',
        age: ''
    };

    constructor(props) {
        super(props);
        this.state = {
            member : this.emptyMember
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount(){
        console.log(this.props.match.params.id);
        if(this.props.match.params.id !== 'new'){
            const data = await (await fetch(`/api/member/${this.props.match.params.id}`)).json();
            this.setState({member:data.data})
        }
    }

    handleChange(event){
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let member = {...this.state.member};
        member[name] = value;
        this.setState({member});

    }

    async handleSubmit(event){
        event.preventDefault();
        const {member} = this.state;

        await fetch('/api/member', {
            method: (member.memNo) ? 'PUT' : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(member)
        });
        this.props.history.push('/members');

    }

    render() {
        const {member} = this.state;
        const title = <h2>{member.id ? 'Edit Member' : 'Add Member'}</h2>;

        return <div>
            <AppNavbar/>
            <Container>
                {title}
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="id">Id</Label>
                        <Input type="text" name="id" id="id" value={member.id || ''}
                               onChange={this.handleChange} autoComplete="id"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="name">Name</Label>
                        <Input type="text" name="name" id="name" value={member.name || ''}
                               onChange={this.handleChange} autoComplete="name"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="email">Email</Label>
                        <Input type="text" name="email" id="email" value={member.email || ''}
                               onChange={this.handleChange} autoComplete="email"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="address">Address</Label>
                        <Input type="text" name="address" id="address" value={member.address || ''}
                               onChange={this.handleChange} autoComplete="address-level1"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="age">Age</Label>
                        <Input type="text" name="age" id="age" value={member.age || ''}
                               onChange={this.handleChange} autoComplete="age"/>
                    </FormGroup>
                    <FormGroup>
                        <Button color="primary" type="submit">Save</Button>{' '}
                        <Button color="secondary" tag={Link} to="/members">Cancel</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    }
}

export default withRouter(MemberEdit);

