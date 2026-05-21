import { useState } from "react";
import type { CreateMember } from '../types/member'

interface Props {
    onMemberCreated: (member: CreateMember) => void;
}

function MemberForm({ onMemberCreated }: Props) {
    const [formData, setFormData] = useState<CreateMember>({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        dateOfBirth: ''
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onMemberCreated(formData)
        setFormData({
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
            dateOfBirth: ''
        })
    }

    return (
        <div>
            <h2>Dodaj clana</h2>
            <form onSubmit={handleSubmit}>
                <input
                    name="firstName"
                    placeholder="Ime"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                />
                <input
                    name="lastName"
                    placeholder="Prezime"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                />
                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    name="phoneNumber"
                    placeholder="Telefon"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                />
                <input
                    name="dateOfBirth"
                    type="date"
                    placeholder="Datum rođenja"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                />
                <button type="submit">Dodaj clana</button>
            </form>
        </div>
    )
}

export default MemberForm;