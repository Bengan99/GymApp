import { useEffect, useState } from 'react'
import type { Member, CreateMember } from '../types/member'
import { memberService } from '../services/memberService'
import MemberForm from '../components/MemberForm'
import MembersTable from '../components/MembersTable'

function MembersPage() {
    const [members, setMembers] = useState<Member[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

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

    const handleDelete = async (id: number) => {
        if (!window.confirm('Da li ste sigurni da želite da obrišete ovog člana?')) return;
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
            <MemberForm onMemberCreated={handleMemberCreated} />
            <MembersTable members={members} onDelete={handleDelete} />
        </div>
    )
}

export default MembersPage