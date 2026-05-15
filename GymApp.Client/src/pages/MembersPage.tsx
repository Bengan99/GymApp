import { useEffect, useState } from 'react'
import type { Member } from '../types/member'
import { memberService } from '../services/memberService'

function MembersPage() {
    const [members, setMembers] = useState<Member[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        memberService.getAll()
            .then(data => setMembers(data))
            .catch(() => setError('Greška pri učitavanju članova'))
            .finally(() => setLoading(false))
    }, [])

    if (loading) return <p>Učitavanje...</p>
    if (error) return <p>{error}</p>

    return (
        <div>
            <h1>Članovi</h1>
            {members.length === 0 ? (
                <p>Nema članova.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Ime</th>
                            <th>Prezime</th>
                            <th>Email</th>
                            <th>Telefon</th>
                            <th>Član od</th>
                            <th>Aktivan</th>
                        </tr>
                    </thead>
                    <tbody>
                        {members.map(member => (
                            <tr key={member.id}>
                                <td>{member.firstName}</td>
                                <td>{member.lastName}</td>
                                <td>{member.email}</td>
                                <td>{member.phoneNumber}</td>
                                <td>{new Date(member.memberSince).toLocaleDateString('sr-RS')}</td>
                                <td>{member.isActive ? '✅' : '❌'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}

export default MembersPage