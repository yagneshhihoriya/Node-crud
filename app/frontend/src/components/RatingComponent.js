import { AutoComplete, Form, ButtonToolbar, Button, Rate, InputGroup, Loader } from "rsuite"
import { useState, useEffect } from 'react'
import { PushNotification } from "./NotificationComponent"

export const RatingsComponent = () => {
    const [autoCompleteList, setAutoCompleteList] = useState([])
    const [hotelList, setHotelList] = useState([])
    const [loading, setLoading] = useState(false)
    const [loadSubmit, setLoadSubmit] = useState(false)
    const [hotelName, setHotelName] = useState('')
    const [email, setEmail] = useState('')
    const [rating, setRating] = useState(0)

    useEffect(() => {
        loadHotels()
    }, [])

    const loadHotels = () => {
        setLoading(true)
        setAutoCompleteList([])
        fetch('http://localhost:3000/hotel')
            .then((res) => res.json())
            .then((json) => {
                setHotelList(json.data)
                let list = json.data?.map(ele => { return ele.name })
                setAutoCompleteList(list)
            }).catch((error) => {
                PushNotification("api call failed", 'error')
                setAutoCompleteList([])
            }).finally(() => {
                setLoading(false)
            })
    }

    const addRating = (e) => {
        let hotelId = hotelList.find(ele => ele.name === hotelName)?._id
        if (!hotelId) {
            PushNotification('hotel name is required', 'error')
            return
        }
        if (!email) {
            PushNotification('email is required', 'error')
            return
        }
        setLoadSubmit(true)
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const requestConfig = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify({
                hotelId,
                email,
                rating
            })
        }
        fetch("http://localhost:3000/hotel/add/rating", requestConfig)
            .then(response => response.json())
            .then(result => {
                let type = result.status === 200 ? 'success' : 'error'
                PushNotification(result.message, type)
            })
            .catch(error => PushNotification(error.message, 'error'))
            .finally(() => { setLoadSubmit(false) })
    }
    return (
        <>
            <Form layout="horizontal" onSubmit={addRating}>
                <Form.Group controlId="hotelName">
                    <Form.ControlLabel>Hotel</Form.ControlLabel>
                    <InputGroup style={{ width: "60%" }} >
                        <AutoComplete name="hotelName" onChange={(val) => { setHotelName(val) }} data={autoCompleteList} onFocus={loadHotels} />
                        {loading ? (<InputGroup.Addon>
                            <Loader />
                        </InputGroup.Addon>) : <></>}
                    </InputGroup>
                </Form.Group>
                <Form.Group controlId="email">
                    <Form.ControlLabel>Email</Form.ControlLabel>
                    <Form.Control name="email" type="email" onChange={(val) => { setEmail(val) }} />
                </Form.Group>
                <Form.Group controlId="rate">
                    <Form.ControlLabel>Rate:</Form.ControlLabel>
                    <Form.Control name="rate" accepter={Rate} onChange={(val) => { setRating(val) }} allowHalf />
                </Form.Group>
                <Form.Group>
                    <ButtonToolbar>
                        <Button appearance="primary" type="submit" disabled={loadSubmit}>
                            {loadSubmit ? (<InputGroup.Addon>
                                <Loader />
                            </InputGroup.Addon>) : "Submit"}
                        </Button>
                        <Button appearance="default">Cancel</Button>
                    </ButtonToolbar>
                </Form.Group>
            </Form >
        </>
    )
}