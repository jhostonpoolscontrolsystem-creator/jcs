import 'package:flutter_test/flutter_test.dart';
import 'package:jhpcs_mobile/main.dart';

void main() {
  testWidgets('White Label app renders smoke test', (WidgetTester tester) async {
    await tester.pumpWidget(const JhostonWhiteLabelApp());
    expect(find.text('JHPCS Tratador'), findsOneWidget);
  });
}
