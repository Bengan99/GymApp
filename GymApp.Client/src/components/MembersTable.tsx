import type { Member } from "../types/member";

interface Props {
    members: Member[];
}

function MembersTable({ members }: Props) {
    if (members.length === 0) return <p>Nema clanova.</p>;

    return (
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
    )
}

export default MembersTable;