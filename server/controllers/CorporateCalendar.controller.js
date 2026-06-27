import { CorporateCalendar } from "../models/CorporateCalendar.model.js"

export const HandleCreateEvent = async (req, res) => {
    try {
        const { eventtitle, eventdate, description, audience } = req.body

        if (!eventtitle || !eventdate || !description || !audience) {
            return res.status(400).json({ success: false, message: "All fields are required" })
        }


        const event = await CorporateCalendar.findOne({ eventtitle: eventtitle, organizationID: req.ORGID })

        if (event) {
            return res.status(409).json({ success: false, message: "Event already exists" })
        }

        const newEvent = await CorporateCalendar.create({
            eventtitle: eventtitle,
            eventdate: eventdate,
            description: description,
            audience: audience,
            organizationID: req.ORGID
        })

        return res.status(200).json({ success: true, message: "Event created successfully", data: newEvent, type: "EventCreate" })
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error", error: error })
    }
}

export const HandleAllEvents = async (req, res) => {
    try {
        const events = await CorporateCalendar.find({ organizationID: req.ORGID })
        return res.status(200).json({ success: true, message: "All events retrieved successfully", data: events, type: "AllEvents" })
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error", error: error })
    }
}

export const HandleEvent = async (req, res) => {
    try {
        const { eventID } = req.params
        const event = await CorporateCalendar.findOne({ _id: eventID, organizationID: req.ORGID })

        if (!event) {
            return res.status(404).json({ success: false, message: "Event not found" })
        }

        return res.status(200).json({ success: true, message: "Event retrieved successfully", data: event })
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error", error: error })
    }
}

export const HandleUpdateEvent = async (req, res) => {
    try {
        const { eventID, updatedData } = req.body
        const event = await CorporateCalendar.findByIdAndUpdate(eventID, updatedData, { new: true })

        if (!event) {
            return res.status(404).json({ success: false, message: "Event not found" })
        }

        return res.status(200).json({ success: true, message: "Event updated successfully", data: event, type: "EventUpdate" })
    }
    catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error", error: error })
    }
}


export const HandleDeleteEvent = async (req, res) => {
    try {
        const { eventID } = req.params
        const deletedEvent = await CorporateCalendar.findByIdAndDelete(eventID)

        if (!deletedEvent) {
            return res.status(404).json({ success: false, message: "Event not found" })
        }

        return res.status(200).json({ success: true, message: "Event deleted successfully", type: "EventDelete" })
    }
    catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error", error: error })
    }
}
