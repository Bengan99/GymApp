import { useState } from 'react'
import type { CreateMember, Member } from '../types/member'

interface Props {
    onMemberCreated: (member: CreateMember) => void
    onMemberUpdated?: (id: number, member: CreateMember) => void
    editingMember?: Member | null
    onCancelEdit?: () => void
}

function MemberForm({ onMemberCreated, onMemberUpdated, editingMember, onCancelEdit }: Props) {
    const [formData, setFormData] = useState<CreateMember>({
        firstName: editingMember?.firstName ?? '',
        lastName: editingMember?.lastName ?? '',
        email: editingMember?.email ?? '',
        phoneNumber: editingMember?.phoneNumber ?? '',
        isActive: editingMember?.isActive ?? true
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.checked
        })
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (editingMember) {
            onMemberUpdated?.(editingMember.id, formData)
        } else {
            onMemberCreated(formData)
        }
        setFormData({
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
            isActive: true
        })
    }

    return (
        <div>
            <h2>{editingMember ? 'Uredi člana' : 'Dodaj člana'}</h2>
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
                    required
                />
                <label>
                    Aktivan član
                    <input
                        name="isActive"
                        type="checkbox"
                        checked={formData.isActive ?? true}
                        onChange={handleCheckbox}
                    />
                </label>
                <button type="submit">
                    {editingMember ? 'Sačuvaj izmjene' : 'Dodaj člana'}
                </button>
                {editingMember && (
                    <button type="button" onClick={onCancelEdit}>Otkaži</button>
                )}
            </form>
        </div>
    )
}

export default MemberForm