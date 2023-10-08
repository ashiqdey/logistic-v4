<?php
function format_estimate($newQuery)
{
        $newQuery->resolved = (bool)$newQuery->resolved;
        $newQuery->ts = (int)$newQuery->ts;

    return $newQuery;
}

