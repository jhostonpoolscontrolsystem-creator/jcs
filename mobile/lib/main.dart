import 'package:flutter/material.dart';

void main() {
  runApp(const JhostonWhiteLabelApp());
}

/// Tema e Customização White Label (JHoston Pools ou Parceiro)
class WhiteLabelTheme {
  static const String appName = 'JHPCS Tratador';
  static const String companyName = 'JHoston Pools';
  static const String slogan = 'Controle Operacional & Proteção de Garantia';

  static const Color primary = Color(0xFF06B6D4); // Ciano JHoston
  static const Color primaryDark = Color(0xFF0891B2);
  static const Color darkBackground = Color(0xFF020617);
  static const Color darkCard = Color(0xFF0F172A);
  static const Color darkCardBorder = Color(0xFF1E293B);
  static const Color success = Color(0xFF10B981);
  static const Color danger = Color(0xFFEF4444);
  static const Color warning = Color(0xFFF59E0B);
}

class JhostonWhiteLabelApp extends StatelessWidget {
  const JhostonWhiteLabelApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: WhiteLabelTheme.appName,
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        brightness: Brightness.dark,
        scaffoldBackgroundColor: WhiteLabelTheme.darkBackground,
        primaryColor: WhiteLabelTheme.primary,
        colorScheme: const ColorScheme.dark(
          primary: WhiteLabelTheme.primary,
          secondary: WhiteLabelTheme.primaryDark,
          surface: WhiteLabelTheme.darkCard,
        ),
        fontFamily: 'Roboto',
      ),
      home: const PiscineiroHomeScreen(),
    );
  }
}

class PiscineiroHomeScreen extends StatefulWidget {
  const PiscineiroHomeScreen({super.key});

  @override
  State<PiscineiroHomeScreen> createState() => _PiscineiroHomeScreenState();
}

class _PiscineiroHomeScreenState extends State<PiscineiroHomeScreen> {
  // Tratador autenticado
  String maintainerName = 'João Tratador';
  String maintainerCpf = '123.456.789-00';

  // Piscinas da rota do tratador
  final List<Map<String, dynamic>> pools = [
    {
      'id': 'p-1',
      'name': 'Piscina Olímpica - Resort Terravista',
      'facility': 'Resort',
      'volume': 350,
      'status': 'NORMAL',
      'lastVisit': 'Ontem às 16:00',
    },
    {
      'id': 'p-2',
      'name': 'Piscina de Areia - Hotel Fasano',
      'facility': 'Hotel',
      'volume': 180,
      'status': 'RED_ZONE',
      'lastVisit': 'Hoje às 08:30',
    },
    {
      'id': 'p-3',
      'name': 'Piscina Privativa - Alphaville #4',
      'facility': 'Residencial',
      'volume': 65,
      'status': 'SUBMERGED_CURE',
      'lastVisit': 'Hoje às 09:15',
    },
  ];

  Map<String, dynamic>? selectedPool;

  // Parâmetros do tratamento atual
  double ph = 7.4;
  double chlorine = 2.0;
  double alkalinity = 100;
  bool brushedSurface = true;
  bool backwashedFilter = false;
  bool acidUsed = false;
  bool photoEvidenceTaken = false;

  bool isSubmitting = false;
  String? successMessage;

  @override
  void initState() {
    super.initState();
    selectedPool = pools[0];
  }

  void _calculateDosageAndSubmit() {
    setState(() {
      isSubmitting = true;
      successMessage = null;
    });

    // Simula cálculo e envio para API / Supabase
    Future.delayed(const Duration(seconds: 1), () {
      if (!mounted) return;
      setState(() {
        isSubmitting = false;
        successMessage =
            '✅ Atendimento sincronizado com sucesso!\nGarantia validada para ${selectedPool!['name']}.';
      });

      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text(
            'Visita concluída com sucesso! Dosagem registrada.',
            style: const TextStyle(fontWeight: FontWeight.bold),
          ),
          backgroundColor: WhiteLabelTheme.success,
          behavior: SnackBarBehavior.floating,
        ),
      );
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: WhiteLabelTheme.darkCard,
        elevation: 0,
        title: Row(
          children: [
            Container(
              padding: const EdgeInsets.all(6),
              decoration: BoxDecoration(
                color: WhiteLabelTheme.primary.withOpacity(0.2),
                borderRadius: BorderRadius.circular(10),
                border: Border.all(color: WhiteLabelTheme.primary.withOpacity(0.4)),
              ),
              child: const Icon(Icons.water_drop, color: WhiteLabelTheme.primary, size: 20),
            ),
            const SizedBox(width: 10),
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  WhiteLabelTheme.appName,
                  style: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: Colors.white),
                ),
                Text(
                  maintainerName,
                  style: TextStyle(fontSize: 11, color: Colors.grey[400]),
                ),
              ],
            ),
          ],
        ),
        actions: [
          Container(
            margin: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
            decoration: BoxDecoration(
              color: Colors.green.withOpacity(0.15),
              borderRadius: BorderRadius.circular(20),
              border: Border.all(color: Colors.green.withOpacity(0.4)),
            ),
            child: Row(
              mainAxisSize: MainAxisSize.min,
              children: const [
                Icon(Icons.wifi, color: Colors.green, size: 14),
                SizedBox(width: 4),
                Text('Online', style: TextStyle(color: Colors.green, fontSize: 11, fontWeight: FontWeight.bold)),
              ],
            ),
          ),
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            // 1. Card de Seleção da Piscina (Rota do Dia)
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: WhiteLabelTheme.darkCard,
                borderRadius: BorderRadius.circular(18),
                border: Border.all(color: WhiteLabelTheme.darkCardBorder),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      const Text(
                        '1. SELECIONE A PISCINA NA ROTA',
                        style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: WhiteLabelTheme.primary, letterSpacing: 0.8),
                      ),
                      Text(
                        '${pools.length} piscinas',
                        style: TextStyle(fontSize: 11, color: Colors.grey[400]),
                      ),
                    ],
                  ),
                  const SizedBox(height: 12),
                  DropdownButtonFormField<Map<String, dynamic>>(
                    value: selectedPool,
                    dropdownColor: WhiteLabelTheme.darkCard,
                    decoration: InputDecoration(
                      filled: true,
                      fillColor: WhiteLabelTheme.darkBackground,
                      contentPadding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(12),
                        borderSide: BorderSide(color: WhiteLabelTheme.darkCardBorder),
                      ),
                      enabledBorder: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(12),
                        borderSide: BorderSide(color: WhiteLabelTheme.darkCardBorder),
                      ),
                    ),
                    items: pools.map((p) {
                      return DropdownMenuItem<Map<String, dynamic>>(
                        value: p,
                        child: Text(
                          '${p['name']} (${p['volume']} m³)',
                          style: const TextStyle(fontSize: 13, color: Colors.white, fontWeight: FontWeight.w600),
                          overflow: TextOverflow.ellipsis,
                        ),
                      );
                    }).toList(),
                    onChanged: (val) {
                      if (val != null) setState(() => selectedPool = val);
                    },
                  ),
                  const SizedBox(height: 10),
                  Row(
                    children: [
                      Icon(Icons.location_on, size: 14, color: Colors.grey[400]),
                      const SizedBox(width: 4),
                      Text(
                        'Volume: ${selectedPool!['volume']} m³ | ${selectedPool!['facility']}',
                        style: TextStyle(fontSize: 12, color: Colors.grey[300]),
                      ),
                    ],
                  ),
                ],
              ),
            ),

            const SizedBox(height: 16),

            // 2. Parâmetros Físico-Químicos Rápidos
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: WhiteLabelTheme.darkCard,
                borderRadius: BorderRadius.circular(18),
                border: Border.all(color: WhiteLabelTheme.darkCardBorder),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text(
                    '2. PARÂMETROS DA ÁGUA (TESTE)',
                    style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: WhiteLabelTheme.primary, letterSpacing: 0.8),
                  ),
                  const SizedBox(height: 16),

                  // Controle de pH
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          const Text('pH da Água', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13)),
                          Text('Ideal: 7.4 a 7.6', style: TextStyle(fontSize: 11, color: Colors.grey[400])),
                        ],
                      ),
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 6),
                        decoration: BoxDecoration(
                          color: ph < 7.0 ? WhiteLabelTheme.danger.withOpacity(0.2) : WhiteLabelTheme.success.withOpacity(0.2),
                          borderRadius: BorderRadius.circular(10),
                          border: Border.all(
                            color: ph < 7.0 ? WhiteLabelTheme.danger : WhiteLabelTheme.success,
                          ),
                        ),
                        child: Text(
                          ph.toStringAsFixed(1),
                          style: TextStyle(
                            fontSize: 18,
                            fontWeight: FontWeight.bold,
                            color: ph < 7.0 ? WhiteLabelTheme.danger : WhiteLabelTheme.success,
                          ),
                        ),
                      ),
                    ],
                  ),
                  Slider(
                    value: ph,
                    min: 6.2,
                    max: 8.4,
                    divisions: 22,
                    activeColor: ph < 7.0 ? WhiteLabelTheme.danger : WhiteLabelTheme.primary,
                    inactiveColor: Colors.grey[800],
                    onChanged: (v) => setState(() => ph = v),
                  ),

                  const Divider(color: WhiteLabelTheme.darkCardBorder),

                  // Controle de Cloro
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          const Text('Cloro Livre (ppm)', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13)),
                          Text('Ideal: 1.5 a 3.0 ppm', style: TextStyle(fontSize: 11, color: Colors.grey[400])),
                        ],
                      ),
                      Text(
                        '${chlorine.toStringAsFixed(1)} ppm',
                        style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: WhiteLabelTheme.primary),
                      ),
                    ],
                  ),
                  Slider(
                    value: chlorine,
                    min: 0.0,
                    max: 5.0,
                    divisions: 50,
                    activeColor: WhiteLabelTheme.primary,
                    inactiveColor: Colors.grey[800],
                    onChanged: (v) => setState(() => chlorine = v),
                  ),

                  const Divider(color: WhiteLabelTheme.darkCardBorder),

                  // Controle de Alcalinidade
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          const Text('Alcalinidade Total', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13)),
                          Text('Ideal: 80 a 120 ppm', style: TextStyle(fontSize: 11, color: Colors.grey[400])),
                        ],
                      ),
                      Text(
                        '${alkalinity.toInt()} ppm',
                        style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Colors.indigoAccent),
                      ),
                    ],
                  ),
                  Slider(
                    value: alkalinity,
                    min: 30,
                    max: 180,
                    divisions: 15,
                    activeColor: Colors.indigoAccent,
                    inactiveColor: Colors.grey[800],
                    onChanged: (v) => setState(() => alkalinity = v),
                  ),
                ],
              ),
            ),

            const SizedBox(height: 16),

            // 3. Checklist Operacional Obrigatório
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: WhiteLabelTheme.darkCard,
                borderRadius: BorderRadius.circular(18),
                border: Border.all(color: WhiteLabelTheme.darkCardBorder),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text(
                    '3. CHECKLIST OPERACIONAL & SEGURANÇA',
                    style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: WhiteLabelTheme.primary, letterSpacing: 0.8),
                  ),
                  const SizedBox(height: 10),

                  SwitchListTile(
                    contentPadding: EdgeInsets.zero,
                    title: const Text('Escovação do Revestimento Monolítico', style: TextStyle(fontSize: 13, fontWeight: FontWeight.w600)),
                    subtitle: Text('Essencial para prevenir biofilme e manchas', style: TextStyle(fontSize: 11, color: Colors.grey[400])),
                    value: brushedSurface,
                    activeColor: WhiteLabelTheme.primary,
                    onChanged: (val) => setState(() => brushedSurface = val),
                  ),

                  const Divider(color: WhiteLabelTheme.darkCardBorder),

                  SwitchListTile(
                    contentPadding: EdgeInsets.zero,
                    title: const Text('Retrolavagem do Filtro Realizada', style: TextStyle(fontSize: 13, fontWeight: FontWeight.w600)),
                    subtitle: Text('Garante a vazão hidráulica ideal da bomba', style: TextStyle(fontSize: 11, color: Colors.grey[400])),
                    value: backwashedFilter,
                    activeColor: WhiteLabelTheme.primary,
                    onChanged: (val) => setState(() => backwashedFilter = val),
                  ),

                  const Divider(color: WhiteLabelTheme.darkCardBorder),

                  SwitchListTile(
                    contentPadding: EdgeInsets.zero,
                    title: const Text('USO DE ÁCIDO / LIMPA PEDRAS', style: TextStyle(fontSize: 13, fontWeight: FontWeight.bold, color: Colors.redAccent)),
                    subtitle: const Text('PROIBIDO: Causa perda imediata da garantia', style: TextStyle(fontSize: 11, color: Colors.redAccent)),
                    value: acidUsed,
                    activeColor: WhiteLabelTheme.danger,
                    onChanged: (val) {
                      setState(() => acidUsed = val);
                      if (val) {
                        ScaffoldMessenger.of(context).showSnackBar(
                          const SnackBar(
                            content: Text('ATENÇÃO: O uso de ácidos danifica monólitos e suspende a garantia!'),
                            backgroundColor: WhiteLabelTheme.danger,
                          ),
                        );
                      }
                    },
                  ),
                ],
              ),
            ),

            const SizedBox(height: 16),

            // 4. Registro Fotográfico de Evidência
            InkWell(
              onTap: () {
                setState(() => photoEvidenceTaken = !photoEvidenceTaken);
              },
              borderRadius: BorderRadius.circular(18),
              child: Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: photoEvidenceTaken ? Colors.green.withOpacity(0.1) : WhiteLabelTheme.darkCard,
                  borderRadius: BorderRadius.circular(18),
                  border: Border.all(
                    color: photoEvidenceTaken ? Colors.green : WhiteLabelTheme.darkCardBorder,
                  ),
                ),
                child: Row(
                  children: [
                    Container(
                      padding: const EdgeInsets.all(10),
                      decoration: BoxDecoration(
                        color: photoEvidenceTaken ? Colors.green.withOpacity(0.2) : Colors.grey[800],
                        borderRadius: BorderRadius.circular(12),
                      ),
                      child: Icon(
                        photoEvidenceTaken ? Icons.check_circle : Icons.camera_alt,
                        color: photoEvidenceTaken ? Colors.green : Colors.grey[300],
                        size: 24,
                      ),
                    ),
                    const SizedBox(width: 14),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            photoEvidenceTaken ? 'Foto da Piscina & Fita Capturada' : 'Tirar Foto da Fita de Teste / Piscina',
                            style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13),
                          ),
                          Text(
                            photoEvidenceTaken ? 'Comprovante anexado à auditoria' : 'Toque para abrir a câmera ou galeria',
                            style: TextStyle(fontSize: 11, color: Colors.grey[400]),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
            ),

            const SizedBox(height: 24),

            // Botão Principal de Conclusão da Visita
            ElevatedButton(
              onPressed: isSubmitting ? null : _calculateDosageAndSubmit,
              style: ElevatedButton.styleFrom(
                backgroundColor: WhiteLabelTheme.primary,
                foregroundColor: Colors.black,
                padding: const EdgeInsets.symmetric(vertical: 16),
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                elevation: 4,
              ),
              child: isSubmitting
                  ? const SizedBox(
                      height: 20,
                      width: 20,
                      child: CircularProgressIndicator(color: Colors.black, strokeWidth: 2),
                    )
                  : Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: const [
                        Icon(Icons.check, size: 20),
                        SizedBox(width: 8),
                        Text(
                          'FINALIZAR TRATAMENTO & VALIDAR GARANTIA',
                          style: TextStyle(fontSize: 13, fontWeight: FontWeight.w900),
                        ),
                      ],
                    ),
            ),

            if (successMessage != null) ...[
              const SizedBox(height: 16),
              Container(
                padding: const EdgeInsets.all(14),
                decoration: BoxDecoration(
                  color: Colors.green.withOpacity(0.15),
                  borderRadius: BorderRadius.circular(14),
                  border: Border.all(color: Colors.green.withOpacity(0.5)),
                ),
                child: Text(
                  successMessage!,
                  style: const TextStyle(color: Colors.greenAccent, fontSize: 12, height: 1.4, fontWeight: FontWeight.bold),
                  textAlign: TextAlign.center,
                ),
              ),
            ],

            const SizedBox(height: 24),
            Center(
              child: Text(
                'JHoston Pools • White Label APK • Versão 1.0.0',
                style: TextStyle(color: Colors.grey[600], fontSize: 11),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
