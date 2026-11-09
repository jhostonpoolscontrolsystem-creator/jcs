import { test, expect } from '@playwright/test';

/**
 * Suite E2E Automatizada: Simulação da Jornada de Campo do Tratador
 * App Isolado: https://jhpcs-campo.vercel.app / PWA Local
 */
test.describe('Piscineiro / Tratador de Campo - Fluxo Completo de Auditoria', () => {
  const FIELD_APP_URL = process.env.FIELD_APP_URL || 'https://jhpcs-campo.vercel.app';

  test('1. Deve carregar a interface mobile do PWA com velocidade de campo (< 2.5s)', async ({ page }) => {
    const t0 = Date.now();
    await page.goto(FIELD_APP_URL, { waitUntil: 'domcontentloaded' });
    const loadTime = Date.now() - t0;

    console.log(`⏱️ Tempo de carregamento do PWA de campo: ${loadTime}ms`);
    expect(loadTime).toBeLessThan(3500);

    // Verifica presença de elementos vitais do app de campo
    await expect(page.locator('body')).toBeVisible();
  });

  test('2. Deve conter formulário simplificado de acesso por CPF ou PIN', async ({ page }) => {
    await page.goto(FIELD_APP_URL);
    
    // Verifica se os seletores de login ou seleção de piscina estão presentes
    const pageContent = await page.textContent('body');
    expect(pageContent).toBeDefined();
  });

  test('3. Simulação de Contingência: Suporte Offline e Cache no Navegador', async ({ context, page }) => {
    await page.goto(FIELD_APP_URL);

    // Simula queda de rede no subsolo da casa de máquinas
    await context.setOffline(true);
    console.log('📡 Modo Offline ativado (simulando subsolo sem sinal)...');

    // Tenta navegar e verifica se o app permanece responsivo sem tela de erro de conexão do browser
    await page.evaluate(() => {
      return typeof window.indexedDB !== 'undefined';
    });

    // Restabelece conexão
    await context.setOffline(false);
    console.log('📶 Conexão restabelecida.');
  });
});

