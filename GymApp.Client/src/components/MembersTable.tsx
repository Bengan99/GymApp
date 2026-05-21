import type { Member } from "../types/member";

interface Props {
    members: Member[];
    onDelete: (id: number) => void;
}

function MembersTable({ members, onDelete }: Props) {
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
                    <th>Akcije</th>
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
                        <td>
                            <button onClick={() => onDelete(member.id)}>Obriši</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default MembersTable;