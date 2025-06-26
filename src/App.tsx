import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./components/ui/table";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Download, FileText } from "lucide-react";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function App() {
  const [agendamentos, setAgendamentos] = useState([
    { data: "", paciente: "", procedimento: "", medico: "", convenio: "", hospital: "", instrumentador: "" },
  ]);

  const handleInputChange = (index, field, value) => {
    const updated = [...agendamentos];
    updated[index][field] = value;
    setAgendamentos(updated);
  };

  const adicionarLinha = () => {
    const novaData = "";
    const novoProcedimento = "";
    const existeAgendamento = agendamentos.some(
      (ag) => ag.data === novaData && ag.procedimento === novoProcedimento
    );

    if (existeAgendamento) {
      alert("Já existe um agendamento com o mesmo procedimento na mesma data.");
      return;
    }

    setAgendamentos([
      ...agendamentos,
      { data: novaData, paciente: "", procedimento: novoProcedimento, medico: "", convenio: "", hospital: "", instrumentador: "" },
    ]);
  };

  const removerLinha = (index) => {
    const updated = agendamentos.filter((_, i) => i !== index);
    setAgendamentos(updated);
  };

  const exportarExcel = () => {
    const ws = XLSX.utils.json_to_sheet(agendamentos);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Agendamentos");
    XLSX.writeFile(wb, "agendamentos.xlsx");
  };

  const exportarPDF = () => {
    const doc = new jsPDF();
    autoTable(doc, {
      head: [["Data", "Paciente", "Procedimento", "Médico", "Convênio", "Hospital", "Instrumentador"]],
      body: agendamentos.map(ag => [
        ag.data, ag.paciente, ag.procedimento, ag.medico, ag.convenio, ag.hospital, ag.instrumentador
      ])
    });
    doc.save("agendamentos.pdf");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Agendamento de Cirurgias</h1>
      <div className="flex gap-4 mb-4">
        <Button onClick={exportarExcel} variant="outline">
          <Download className="mr-2 h-4 w-4" /> Exportar Excel
        </Button>
        <Button onClick={exportarPDF} variant="outline">
          <FileText className="mr-2 h-4 w-4" /> Exportar PDF
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Data</TableHead>
            <TableHead>Paciente</TableHead>
            <TableHead>Procedimento</TableHead>
            <TableHead>Médico</TableHead>
            <TableHead>Convênio</TableHead>
            <TableHead>Hospital</TableHead>
            <TableHead>Instrumentador</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {agendamentos.map((ag, index) => (
            <TableRow key={index}>
              <TableCell>
                <Input
                  type="date"
                  value={ag.data}
                  onChange={(e) => handleInputChange(index, "data", e.target.value)}
                />
              </TableCell>
              <TableCell>
                <Input
                  value={ag.paciente}
                  onChange={(e) => handleInputChange(index, "paciente", e.target.value)}
                />
              </TableCell>
              <TableCell>
                <Input
                  value={ag.procedimento}
                  onChange={(e) => handleInputChange(index, "procedimento", e.target.value)}
                />
              </TableCell>
              <TableCell>
                <Input
                  value={ag.medico}
                  onChange={(e) => handleInputChange(index, "medico", e.target.value)}
                />
              </TableCell>
              <TableCell>
                <Input
                  value={ag.convenio}
                  onChange={(e) => handleInputChange(index, "convenio", e.target.value)}
                />
              </TableCell>
              <TableCell>
                <Input
                  value={ag.hospital}
                  onChange={(e) => handleInputChange(index, "hospital", e.target.value)}
                />
              </TableCell>
              <TableCell>
                <Input
                  value={ag.instrumentador}
                  onChange={(e) => handleInputChange(index, "instrumentador", e.target.value)}
                />
              </TableCell>
              <TableCell>
                <Button variant="destructive" onClick={() => removerLinha(index)}>
                  Remover
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button className="mt-4" onClick={adicionarLinha}>
        Adicionar Agendamento
      </Button>
    </div>
  );
}
