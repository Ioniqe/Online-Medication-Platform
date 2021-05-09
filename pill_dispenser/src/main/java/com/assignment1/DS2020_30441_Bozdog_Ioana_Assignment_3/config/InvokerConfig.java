package com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.config;

import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.api.DailyMedsService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.remoting.httpinvoker.HttpInvokerProxyFactoryBean;

@Configuration
public class InvokerConfig {
    @Bean
    public HttpInvokerProxyFactoryBean invoker() {
        HttpInvokerProxyFactoryBean invoker = new HttpInvokerProxyFactoryBean();
        invoker.setServiceUrl("http://localhost:8080/get_daily_meds");
        invoker.setServiceInterface(DailyMedsService.class);
        return invoker;
    }

}
