import { useEffect, useState } from 'react'
import type { Member, CreateMember } from '../types/member'
import { memberService } from '../services/memberService'
import MemberForm from '../components/MemberForm'
import MembersTable from '../components/MembersTable'

function MembersPage() {
    const [members, setMembers] = useState<Member[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [editingMember, setEditingMember] = useState<Member | null>(null)

    const loadMembers = () => {
        memberService.getAll()
            .then(data => setMembers(data))
            .catch(() => setError('Greška pri učitavanju članova'))
            .finally(() => setLoading(false))
    }

    useEffect(() => {
        loadMembers()
    }, [])

    const handleMemberCreated = async (newMember: CreateMember) => {
        try {
            await memberService.create(newMember)
            loadMembers()
        } catch {
            setError('Greška pri dodavanju člana')
        }
    }

    const handleMemberUpdated = async (id: number, updatedMember: CreateMember) => {
        try {
            await memberService.update(id, updatedMember)
            setEditingMember(null)
            loadMembers()
        } catch {
            setError('Greška pri editovanju člana')
        }
    }

    const handleDelete = async (id: number) => {
        if (!window.confirm('Da li si siguran da želiš obrisati ovog člana?')) return
        try {
            await memberService.delete(id)
            loadMembers()
        } catch {
            setError('Greška pri brisanju člana')
        }
    }

    if (loading) return <p>Učitavanje...</p>
    if (error) return <p>{error}</p>

    return (
        <div>
            <h1>Članovi</h1>
            <MemberForm
                key={editingMember?.id ?? 'new'}
                onMemberCreated={handleMemberCreated}
                onMemberUpdated={handleMemberUpdated}
                editingMember={editingMember}
                onCancelEdit={() => setEditingMember(null)}
            />
            <MembersTable
                members={members}
                onDelete={handleDelete}
                onEdit={setEditingMember}
            />
        </div>
    )
}

export default MembersPage