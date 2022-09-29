<?php

namespace App\Twig;

use Twig\Environment;
use Twig\Extension\AbstractExtension;
use Twig\TwigFunction;

class SectionTwigExtension extends AbstractExtension
{
    private Environment $twig;

    /**
     * SectionTwigExtension constructor.
     * @param Environment $twig
     */
    public function __construct(Environment $twig)
    {
        $this->twig = $twig;
    }
    /**
     * @return array|TwigFunction[]
     */
    public function getFunctions()
    {
        return [
            new TwigFunction("get_section", [$this, 'getSection'])
        ];
    }

    public function getSection(String $sectionType, $data)
    {
        $loader = $this->twig->getLoader();

        $template = "sections/{$sectionType}.html.twig";

        if($loader->exists($template)){
            return $this->twig->render($template, [
                "data" => $data,
            ]);
        }

        return "Not able to find template in sections/ for type '{$sectionType}'";
    }
}
